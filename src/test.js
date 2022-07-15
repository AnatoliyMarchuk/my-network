const a = {
	name: 'a',
	age: 21,
	students: ['mariya', 'dmytro'],

	classroom: {
		teacher: {
			name: 'qqq',
			age: 34,
		},
	},
};

const b = { ...a };
b.name = 'Oleg';
b.age = 15;
b.classroom.teacher = 'anatoliy';
b.students.push('vasylyi');

console.log(a);
console.log(b);
