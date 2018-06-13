/*
    el:為Vue.js的元素
    data:可在這設置變數
*/
// new Vue({
//     el:'#app',
//     data:{
//         message: 'Hello World!!'
//     },
//     methods: {
//         rever: function(){
//             this.message = this.message.split('').reverse().join('')
//         }
//     }
// });
// Object.freeze(obj);

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})
 
var fData = {
    message: 'Hello!',
    groceryList: [
        { id: 0, text: '喵'},
        { id: 1, text: '汪'},
        { id: 2, text: '吱'}
    ],
    foo: 'bar'
}
var app = new Vue({
    el: '#app',
    data: fData
})


var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello World!',
        date: Date.now(),
        firstName: 'Foo',
        lastName: 'Bar',
        classObject: {
            active: true,
            'text-danger': true
        }
    },
    methods:{
        reversedMessage: function() {
            return this.message.split('').reverse().join('')
        },
        now: function() {
            return Date.now()
        }
    },
    computed: {
        fullName: {
            get: function() {
                return this.firstName + ' ' + this.lastName
            },
            set: function(newValue) {
                var names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
});

vm.fullName = 'John Doe'

var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: '快輸入問題!'
    },
    watch: {
        question: function (newQuestion, oldQuestion) {
            this.answer = '等你輸入完';
            this.debouncedGetAnswer()
        }
    },
    created: function() {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
        // this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
              this.answer = 'Questions usually contain a question mark. ;-)'
              return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
              .then(function (response) {
                vm.answer = _.capitalize(response.data.answer)
              })
              .catch(function (error) {
                vm.answer = 'Error! Could not reach the API. ' + error
              })
          }
    }
})
// setTimeout(function() {
//     data.date = vm.now();
//     console.log('here');}, 1000);

// console.log(vm.$data === data);
// console.log(vm.$el === document.getElementById('example'));

// setTimeout(function() {data.a = 2}, 400);

// vm.$watch('a', function(newValue, oldValue) {
//     console.log(newValue, oldValue);
// })