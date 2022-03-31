const User = require('./User');
const Test = require('./Test');
const Comment = require('./Comment');


//create associations

User.hasMany(Test, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Test.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Comment.belongsTo(Test, {
    foreignKey: 'test_id',
    onDelete: 'CASCADE'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
  
Test.hasMany(Comment, {
    foreignKey: 'test_id',
    onDelete: 'CASCADE'

});

module.exports = {User, Test, Comment};
