import {Meteor} from 'meteor/meteor';
import {tasksCollection} from '../imports/db/collections';
import {imageInfoCollection} from "../imports/db/collections";
import {gtInfoCollection} from "../imports/db/collections";
import {projectCollection} from "../imports/db/collections";
import Images from "../imports/db/files";


imageInfoCollection.allow(
    {insert(){return true}},
        {update(){return true}},
        {remove(){return true}})
gtInfoCollection.allow(
    {insert(){return true}},
    {update(){return true}},
    {remove(){return true}})
projectCollection.allow(
    {insert(){return true}},
    {update(){return true}},
    {remove(){return true}})


Meteor.publish('imageInfoCollection', function () {
  return imageInfoCollection.find();})
Meteor.publish('gtInfoCollection', function () {
  return gtInfoCollection.find();})
Meteor.publish('projectCollection', function () {
  return projectCollection.find();})

Meteor.publish('files.images.all', function () {
  return Images.find().cursor;})









// test---------------------------------------------------------------------------
tasksCollection.allow({
  insert(userId, doc) {
    return userId && doc.userId === userId;
  },
  remove(userId, doc) {
    return userId && doc.userId === userId;
  },
  update(userId, doc) {
    return userId && doc.userId === userId;
  },
});

Meteor.publish('tasksCollection', function publishTasks() {
  // for testing
  const wakeUpTime = Date.now() + 1000;
  while (Date.now() < wakeUpTime) {}
  return tasksCollection.find({ userId: this.userId }, { limit: 5 });
});
