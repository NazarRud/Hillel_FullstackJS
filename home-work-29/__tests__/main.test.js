const { ageClassification, weekFn } = require('../js/main');

describe('function ageClassification', () => {
    const data = [
        [ -1, null ],
        [ 0, null ],
        [ 1, 'Дитинство' ],
        [ 24, 'Дитинство' ],
        [ 24.01, 'Молодість' ],
        [ 44, 'Молодість' ],
        [ 44.01, 'Зрілість' ],
        [ 65, 'Зрілість' ],
        [ 65.1, 'Старість' ],
        [ 75, 'Старість' ],
        [ 75.01, 'Довголіття' ],
        [ 90, 'Довголіття' ],
        [ 90.01, 'Рекорд' ],
        [ 122, 'Рекорд' ],
        [ 122.01, null ],
        [ 150, null ]
    ];
    
    test.each(data)('ageClassification(%d) => %p', (age, res) => {
        expect(ageClassification(age)).toBe(res);
    });    
});

describe('function weekFn', () => {
    const data = [
        [ 1, 'Понеділок' ],
        [ 2, 'Вівторок' ],
        [ 3, 'Середа' ],
        [ 4, 'Четвер' ],
        [ 5, 'П\'ятниця' ],
        [ 6, 'Субота' ],
        [ 7, 'Неділя' ],
        [ 9, null ],
        [ 1.5, null ],
        [ '2', null ]
    ];
    
    test.each(data)('weekFn(%d) => %p', (num, res) => {
        expect(weekFn(num)).toBe(res);
    });    
});