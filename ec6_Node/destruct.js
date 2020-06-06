const user = {
    name: 'Lucas',
    age: 27,
    addres: {
        city: 'SP',
    }
}

//Destruct
const { name, age, addres: { city } } = user;

function logProps({ name, age, addres: { city } }) {
    console.log(name, age, city)
}
logProps(user);

//Sum unlimited params REST operator
function sumArray(...arr) {
    return arr.reduce((total, next) => total + next)
}
console.log(sumArray(1, 2, 3, 4, 5))