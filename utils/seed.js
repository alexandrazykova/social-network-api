// const connection = require('../config/connection');
// const { User, Thought } = require('../models');
// const { users, reactions, thoughts } = require('./data');

// connection.on('error', err => err)

// connection.once('open', async () => {
//     console.log('connected');
//     // Delete the collections if they exist
//     let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
//     if (usersCheck.length) {
//         await connection.dropCollection('users');
//     }

//     let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
//     if (thoughtsCheck.length) {
//         await connection.dropCollection('thoughts');
//     }

//     // Create empty array to hold the students
//     const users = [];

//     // Loop 20 times -- add students to the students array
//     for (let i = 0; i < 10; i++) {
//         // Get some random assignment objects using a helper function that we imported from ./data
//         const assignments = getRandomAssignments(20);

//         const fullName = getRandomName();
//         const first = fullName.split(' ')[0];
//         const last = fullName.split(' ')[1];
//         const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

//         students.push({
//             first,
//             last,
//             github,
//             assignments,
//         });
//     }

//     // Add students to the collection and await the results
//     await Student.collection.insertMany(students);

//     // Add courses to the collection and await the results
//     await Course.collection.insertOne({
//         courseName: 'UCLA',
//         inPerson: false,
//         students: [...students],
//     });

//     // Log out the seed data to indicate what should appear in the database
//     console.table(students);
//     console.info('Seeding complete! 🌱');
//     process.exit(0);
// });