import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import Grid from 'gridfs-stream';
import { MongoInternals } from 'meteor/mongo';
import fs from 'fs';

let gfs;
if (Meteor.isServer) {
  gfs = Grid(
    MongoInternals.defaultRemoteCollectionDriver().mongo.db,
    MongoInternals.NpmModule
  );
}

export const Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: true,
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  },
  onAfterUpload(_file) {
    Object.keys(_file.versions).forEach(versionName => {
      const metadata = { versionName, fileId: _file._id, createdAt: new Date() }; // Optional
      const writeStream = gfs.createWriteStream({ filename: _file.name, metadata });

      fs.createReadStream(_file.versions[versionName].path).pipe(writeStream);

      writeStream.on('close', Meteor.bindEnvironment(file => {
        const property = `versions.${versionName}.meta.gridFsFileId`;
        this.collection.update(_file._id, { $set: { [property]: file._id.toString() } });
        this.unlink(this.collection.findOne(_file._id), versionName); // Unlink files from FS
      }));
    });
  },
  interceptDownload(http, image, versionName) {
    const _id = (image.versions[versionName].meta || {}).gridFsFileId;
    if (_id) {
      const readStream = gfs.createReadStream({ _id });
      readStream.on('error', err => {
        throw err;
      });
      http.response.setHeader('Cache-Control', this.cacheControl);
      readStream.pipe(http.response);
    }
    return Boolean(_id);
  },
  onAfterRemove(images) {
    images.forEach(image => {
      Object.keys(image.versions).forEach(versionName => {
        const _id = (image.versions[versionName].meta || {}).gridFsFileId;
        if (_id) gfs.remove({ _id }, err => {
          if (err) throw err;
        });
      });
    });
  }
});
Images.insertFile = function(file) {
  return Images.insert({ file: file }).config.fileId;
};

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

export default Images;