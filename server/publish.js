import { Meteor } from 'meteor/meteor';
import { tasksCollection } from '../imports/db/collections';

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
