import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Images from "./files";

export const tasksCollection = new Mongo.Collection('tasks');
export const imageInfoCollection = new Mongo.Collection('imageInfo');
export const gtInfoCollection = new Mongo.Collection('gtInfo');
export const projectCollection = new Mongo.Collection('project');


if (Meteor.isClient) {
    Meteor.subscribe('imageInfoCollection');
    Meteor.subscribe('gtInfoCollection');
    Meteor.subscribe('projectCollection');
}
