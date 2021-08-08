const httpErrors = require('http-errors');
const { body } = require('express-validator');

module.exports = {
    sendIndividualNotification: (check) => [
        ...type(body),
        ...content(body),
        ...ids(body),
    ],

    sendGroupNotification: (check) => [
        ...type(body),
        ...content(body),
        ...ids(body),
    ]

}

const type = check => [
    check('type')
    .not()
    .isEmpty()
    .isIn(['text', 'push'])
    .withMessage('type must be text or push')
];

const content = check => [
    check('content')
    .not()
    .isEmpty()
    .custom(value => {

        console.log(value)

        if(!Object.keys(value).includes('english') || !Object.keys(value).includes('urdu')){
            throw new httpErrors.UnprocessableEntity('Invalid content field');
        }

        if(!Object.keys(value['english']).includes('title') || !Object.keys(value['urdu']).includes('body')){
            throw new httpErrors.UnprocessableEntity('Invalid content field');   
        }

        return true;
    })
];

const ids = check => [
    check('ids')
    .not()
    .isEmpty()
    .isArray()
    .custom(value => {
        value.forEach(element => {
            if(typeof(element) != 'number')
                throw new httpErrors.UnprocessableEntity('Invalid ids field');
        });
        return true
    })

];