// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const Diets = new Mongo.Collection('diets');

// structure of a Recipes document
/*
{
  name: restriction name
  importance: need, want
  owner: userId of owner
}
*/
