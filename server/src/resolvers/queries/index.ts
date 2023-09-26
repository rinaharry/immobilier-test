
// Use the generated `QueryResolvers` type to type check our queries!
import modelUser from '../../shema/model/user'
const queries = {
  books:async  ()=> {
    const t = await modelUser.find()
  console.log(t);
  
    return  [

    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ]}
};

export default queries;
