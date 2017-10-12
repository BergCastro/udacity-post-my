const clone = require('clone')

let db = {}

const defaultData = {
  "1": {
    id: '1',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false 
  },
  "2": {
    id: '2',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  "3": {
    id: '3',
    timestamp: 1467166872634,
    title: 'Udacity Missão',
    body: 'Nossa missão é trazer para o mundo um ensino superior acessível, envolvente e altamente eficaz. ',
    author: 'Lindemberg',
    category: 'udacity',
    voteScore: 2,
    deleted: false 
  },
  "4": {
    id: '4',
    timestamp: 1483228800634,
    title: 'Udacity história',
    body: 'A Udacity surgiu de uma experiência na Universidade de Stanford. Sebastian Thrun e Peter Norvig ofereceram um curso online gratuito de "Introdução à Inteligência Artificial", aberto ao público. Foram mais de 160 mil inscritos de 190 países, e logo depois nasceu a Udacity. Hoje somos uma equipe cada vez maior de educadores e engenheiros dedicados a mudar o futuro da educação, unindo as competências requisitadas na vida real, uma educação de relevância e empregabilidade.',
    author: 'Lindemberg',
    category: 'udacity',
    voteScore: 4,
    deleted: false 
  },
  "5": {
    id: '5',
    timestamp: 	1477958399634,
    title: 'React Component-Based',
    body: 'Build encapsulated components that manage their own state, then compose them to make complex UIs..',
    author: 'Lindemberg',
    category: 'react',
    voteScore: 3,
    deleted: false 
  }
  ,
  "6": {
    id: '6',
    timestamp: 1475280000634,
    title: 'Redux Motivation',
    body: 'As the requirements for JavaScript single-page applications have become increasingly complicated, our code must manage more state than ever before. ',
    author: 'Lindemberg',
    category: 'redux',
    voteScore: 8,
    deleted: false 
  }
  ,
  "7": {
    id: '7',
    timestamp: 1443657600111,
    title: 'Redux Single source of truth',
    body: 'The state of your whole application is stored in an object tree within a single store.',
    author: 'Lindemberg',
    category: 'redux',
    voteScore: 8,
    deleted: false 
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted 
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts.deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)
    
    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }
     
    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}