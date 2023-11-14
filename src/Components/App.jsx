import './App.css'

const App = () => {
  const filmIds = [0, 1, 2, 3, 4, 5]
  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="header-buttons">
            <button>Search</button>
            <button>Rated</button>
          </div>

          <input type="text" placeholder="Type to search..." />
        </header>
        <div className="main-content">
          {filmIds.map((e) => (
            <div className="film-card" key={e}>
              <img
                src="https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg"
                alt="film poster"
                className="film-image"
              />
              <div className="film-info">
                <div className="film-header">
                  <h1>Title</h1>
                  <h3>9.9</h3>
                </div>
                <p>March 5, 2020</p>
                <div className="film-genres">
                  <span>Action</span> <span>Drama</span>
                </div>
                <div className="film-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem officia doloremque, vitae
                  explicabo, asperiores delectus nam in nisi eaque veniam, eligendi culpa labore unde quod vero nostrum
                  sit aliquid voluptatum? Illo magnam provident numquam natus et facilis dolore ducimus amet,
                </div>
                <div className="film-stars"> ***********</div>
              </div>
            </div>
          ))}
        </div>
        <footer>
          <p> &lt;- pagination - &gt; </p>
        </footer>
      </div>
    </div>
  )
}

export default App
