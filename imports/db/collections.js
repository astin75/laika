import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const tasksCollection = new Mongo.Collection('tasks');
