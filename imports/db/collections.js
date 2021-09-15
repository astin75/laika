import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const tasksCollection = new Mongo.Collection('tasks');
export const imageInfoCollection = new Mongo.Collection('imageInfo');
export const gtInfoCollection = new Mongo.Collection('gtInfo');
export const projectCollection = new Mongo.Collection('project');


