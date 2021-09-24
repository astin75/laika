import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react';

import ProjectUpload from './ProjectUpload/ProjectUpload';

import { Meteor } from 'meteor/meteor';


//fdfd

export const OptionPage = () => {
  const user = useTracker(() => Meteor.user());
  const [IsThereAdmin, setIsThereAdmin] = useState(false);

  useEffect(() => {
    if (user !== undefined) {
      if (user.profile['rank'] === 'admin') {
        setIsThereAdmin(true);
      }
    }
  }, [user]);

  return IsThereAdmin ? (
    <ProjectUpload />
  ) : (
    <a>
      <img src={'lockDataManagement.png'} />
    </a>
  );
};
