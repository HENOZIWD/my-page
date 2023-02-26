---
title: 'React를 선택한 이유'
description: '초심자의 입장에서'
year: '2023'
month: '2'
day: '26'
hour: '5'
minute: '48'
---

웹 프론트엔드로 진로를 정하고 나에게 맞는 스택이 무엇일지 고민하던 찰나, 프론트엔드 라이브러리 혹은 프레임워크하면 대표적으로 거론되는 3가지 스택이 바로 React, Vue.js, Angular 였다.

당시에는 웹 개발 해본 경험이라고는 학부 수업에서 수박 겉핥기 정도로 HTML과 CSS, Javascript 건드려본게 다였고, 위 스택 3가지도 이름만 들어보았을 정도로 정말 뉴비 그 자체였기에 일단 저 세 스택들이 어떤 친구들인지 무작정 만나러 가 보았다.

# 첫인상

- React
    
    <img src="/posts/Reasons-for-choosing-React/React-index.jpg" alt="err" width="100%" height="100%">
    
    > [https://reactjs.org/](https://reactjs.org/)
    > 

- Vue.js
    
    <img src="/posts/Reasons-for-choosing-React/Vuejs-index.jpg" alt="err" width="100%" height="100%">
    
    > [https://vuejs.org/](https://vuejs.org/)
    > 

- Angular
    
    <img src="/posts/Reasons-for-choosing-React/Angular-index.jpg" alt="err" width="100%" height="100%">
    
    > [https://angular.io/](https://angular.io/)
    > 

Vue.js와 Angular는 유사한 느낌이고 React는 달랐다. 나머지 두 페이지가 간판 예쁘게 꾸민 카페 느낌이라면 React는 일단 이거 잡숴봐 하는 시장 느낌이었다.

초심자의 입장에서 기술 문서들을 볼 때 무언가 자꾸 클릭하고 하위 문서로 이동하는 등 추가적인 동작을 행하는 부분이 적잖은 스트레스로 다가올 수 있다고 생각하는데, 일단 메인 페이지에 라이브 에디터 붙여놓고 이거 이런 맛이야 라고 소개하는 부분이 그런 걱정들을 덜어주어 마음에 들었다.

# 튜토리얼

- React
    
    <img src="/posts/Reasons-for-choosing-React/React-tutorial.jpg" alt="err" width="100%" height="100%">
    
    > [https://reactjs.org/](https://reactjs.org/)
    > 
    
- Vue.js
    
    <img src="/posts/Reasons-for-choosing-React/Vuejs-tutorial.jpg" alt="err" width="100%" height="100%">
    
    > [https://vuejs.org/guide/introduction.html#what-is-vue](https://vuejs.org/guide/introduction.html#what-is-vue)
    > 
    
- Angular
    
    <img src="/posts/Reasons-for-choosing-React/Angular-tutorial-1.jpg" alt="err" width="100%" height="100%">
    
    > [https://angular.io/start](https://angular.io/start)
    > 

React와 Vue.js와는 다르게 Angular 튜토리얼에서는 라이브 에디터를 지원하지 않는다. 마치 위키피디아 문서를 읽고 있는 느낌..

아직 어떤 스택을 공부할 지 정하지 않은 시점이라 튜토리얼 문서 내에서 내가 직접 코드를 수정해가며 테스트할 수 있는지 여부가 중요했다.

# React vs Vue.js

Angular는 마음에서 멀어졌고, 남은건 React와 Vue.js인 상황, 좀 더 쉽게 배울 수 있는 것이 어느 쪽일까 살펴보았다.

아래는 React와 Vue.js 튜토리얼 문서에 나와있는, Todo 목록을 만드는 코드이다. 100% 같지는 않지만 유사한 동작을 하므로 비교하기에 적당하다고 생각했다.

- React
    
    ```jsx
    class TodoApp extends React.Component {
      constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      render() {
        return (
          <div>
            <h3>TODO</h3>
            <TodoList items={this.state.items} />
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="new-todo">
                What needs to be done?
              </label>
              <input
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}
              />
              <button>
                Add #{this.state.items.length + 1}
              </button>
            </form>
          </div>
        );
      }
    
      handleChange(e) {
        this.setState({ text: e.target.value });
      }
    
      handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
          return;
        }
        const newItem = {
          text: this.state.text,
          id: Date.now()
        };
        this.setState(state => ({
          items: state.items.concat(newItem),
          text: ''
        }));
      }
    }
    
    class TodoList extends React.Component {
      render() {
        return (
          <ul>
            {this.props.items.map(item => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        );
      }
    }
    
    root.render(<TodoApp />);
    ```
    
    > [https://reactjs.org/](https://reactjs.org/)
    > 

- Vue.js
    
    ```javascript
    <script>
    let id = 0
    
    export default {
      data() {
        return {
          newTodo: '',
          hideCompleted: false,
          todos: [
            { id: id++, text: 'Learn HTML', done: true },
            { id: id++, text: 'Learn JavaScript', done: true },
            { id: id++, text: 'Learn Vue', done: false }
          ]
        }
      },
      computed: {
        filteredTodos() {
          return this.hideCompleted
            ? this.todos.filter((t) => !t.done)
            : this.todos
        }
      },
      methods: {
        addTodo() {
          this.todos.push({ id: id++, text: this.newTodo, done: false })
          this.newTodo = ''
        },
        removeTodo(todo) {
          this.todos = this.todos.filter((t) => t !== todo)
        }
      }
    }
    </script>
    
    <template>
      <form @submit.prevent="addTodo">
        <input v-model="newTodo">
        <button>Add Todo</button>
      </form>
      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <input type="checkbox" v-model="todo.done">
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
          <button @click="removeTodo(todo)">X</button>
        </li>
      </ul>
      <button @click="hideCompleted = !hideCompleted">
        {{ hideCompleted ? 'Show all' : 'Hide completed' }}
      </button>
    </template>
    
    <style>
    .done {
      text-decoration: line-through;
    }
    </style>
    ```
    
    > [https://vuejs.org/tutorial/#step-8](https://vuejs.org/tutorial/#step-8)
    > 

지금 보면 둘 다 비슷해 보이긴 한데 당시에는 React의 코드가 Vue.js에 비해 낯선 문법들도 덜하고 좀 더 친숙하게 다가왔던 것 같다.

# 마무리

다 써놓고 보니 이유들이 굉장히 유치하다.

그래도 웹 개발 하면서 평생 한가지 스택만 우려먹을 수 있는 것도 아니고, 당시에 무엇을 하겠다고 구체적인 프로젝트를 구상해놓고 스택을 고른 것도 아니었으니 초석으로 삼을 스택을 선택하는 데에는 나름의 정당한 이유가 되지 않았을까.. 합리화를 해 보았다.