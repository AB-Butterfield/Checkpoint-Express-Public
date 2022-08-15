const db = require('./database');
const Sequelize = require('sequelize');
const todos = require('../express-models/todos');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
})


const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);


//TASK CODE
Task.clearCompleted = async function () {
  await Task.destroy({
    where: {complete:true}
  })
}
Task.completeAll = async function () {
  await Task.update(
    {complete: true},
    {where:{complete:false}}
  )
}

Task.prototype.getTimeRemaining = function () {
  if (!this.due){
    return Infinity
  } else {
      let currentDate = Date();
      let currentDateSeconds = Date.parse(currentDate)
      let dueDate = Date.parse(this.due)
      console.log(dueDate, currentDateSeconds)
      return(dueDate - currentDateSeconds)
      //How does time work...?
  }
}

Task.prototype.isOverdue = function () {
  let currentDate = Date();
  let currentDateSeconds = Date.parse(currentDate)
  let dueDate = Date.parse(this.due)
  let pastDueChecker = dueDate - currentDateSeconds

  if(this.complete === true || pastDueChecker > 0) {
    return false
  } else {
    return true
  }
}





//OWNER CODE
Owner.getOwnersAndTasks = async function () {
  let allOwners = await Owner.findAll({include: Task})
  return allOwners
  //return Owner.findAll()
}


Owner.prototype.getIncompleteTasks = async function () {
  let ownersWithTasks = await Owner.findAll({where: {complete: false}})
  console.log(ownersWithTasks)
  return ownersWithTasks
}


Owner.beforeDestroy(async (owner) => {
  if (owner.name === 'Grace Hopper') {
    throw Error
  }
})


//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
