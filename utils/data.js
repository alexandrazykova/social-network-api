const users = [
    {
        username: 'Alex',
        email: 'alex@gmail.com',
        thoughts: [
            'thoughts here',
        ],
        friends: [
            'friend1',
            'friend2',
        ],
    },
    {
        username: 'Maria',
        email: 'maria@gmail.com',
        thoughts: [
            'thoughts here',
        ],
        friends: [
            'friend1',
            'friend2',
        ],
    },
    {
        username: 'Dima',
        email: 'dima@gmail.com',
        thoughts: [
            'thoughts here',
        ],
        friends: [
            'friend1',
            'friend2',
        ],
    },
];

const reactions = [
    {
        reactionBody: 'great',
        username: 'Alex'
    },
    {
        reactionBody: 'could be better',
        username: 'Maria'
    },
    {
        reactionBody: 'very interesting',
        username: 'Dima'
    },
];

module.exports = { users, reactions }