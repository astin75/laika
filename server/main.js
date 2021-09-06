import { Meteor } from 'meteor/meteor';
import { tasksCollection } from '../imports/db/collections';
import './publish.js';

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the tasksCollection collection is empty, add some data.
  if (tasksCollection.find().count() === 0) {
    tasksCollection.insert({
      name: 'Task one',
      owner: 'My',
      completed: false,
      createdAt: new Date(),
    });
  }
});
