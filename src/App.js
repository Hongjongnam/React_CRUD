import './App.css';
import React, { useState } from 'react'

function Nav(props) {
  // console.log(props)


  // const items = [{ id: 1, name: 'jongs' }, { id: 2, name: 'nams' }]
  // const result = items.map((value) => {
  //   return { id: value.id, name: value.name }
  // })
  // console.log(result)
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]
    lis.push(<li key={t.id} ><a id={t.id} href={'/read/' + t.id} onClick={(e) => {
      e.preventDefault()
      props.onChangeMode(Number(e.target.id));
    }}>{t.title}</a></li>)
  }
  // const map = props.topics.map((v) =>
  //   <nav key={v.id}>
  //     <li ><a href={'/read/' + v.id} onClick={(e) => {
  //       e.preventDefault()
  //       props.onChangeMode();
  //     }}>{v.title}</a></li>
  //   </nav>
  // )
  return (
    <nav>
      <ol >
        {lis}
        {/* {map} */}
      </ol>
    </nav>
  )
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onCreate(title, body);

    }}>
      <p><input type="text" name="title" placeholder='title' /></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}


function Header(props) {
  return <header>
    <h1><a href="/" onClick={(e) => {
      e.preventDefault()
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Update(props) {
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)
  return <article>
    <h2>Update</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onUpdate(title, body);

    }}>
      <p><input type="text" name="title" placeholder='title' value={title} onChange={(e) => {
        console.log(e.target.value)
        setTitle(e.target.value)
      }} /></p>
      <p><textarea name="body" placeholder='body' value={body} onChange={(e) => {
        setBody(e.target.value)
      }}></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}


function App() {
  const [mode, setMode] = useState('WELCOME')
  const [id, setId] = useState('')
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'js', body: 'js is...' },
    { id: 4, title: 'react', body: 'react is...' },
  ])
  const [nextId, setNextId] = useState(5)
  // const handleChange = (e) => {
  //   e.preventDefault()
  //   alert('컹스')
  // }


  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="WELCOME" body="Hello,web"></Article>
  } else if (mode === 'READ') {
    let title, body = null
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id)
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl =
      <>
        <li><a href={"/update" + id} onClick={(e) => {
          e.preventDefault();
          setMode('UPDATE')
        }}>Update</a></li>
        <li><input type="button" value='Delete' onClick={() => {
          const newTopics = []
          for (let i = 0; i < topics.length; i++) {
            if (topics[i].id !== id) {
              newTopics.push(topics[i]);
            }
          }
          setTopics(newTopics)
          setMode('WELCOME')
        }}></input></li>
      </>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setMode('READ')
      setId(nextId)
      setNextId(nextId + 1)
    }}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id)
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics]
      const updatedTopic = { id, title, body }
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ')
    }}></Update>
  }
  return (
    <div >
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME')
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ')
        setId(_id)
      }}></Nav>
      <ul>
        {content}
        <li><a href="/create" onClick={(e) => {
          e.preventDefault();
          setMode('CREATE')
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;