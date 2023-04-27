import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }
  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    // state 
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  async componentDidMount() {
    this.updateNews();
  }


  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc2e88c8fe19461f802d0286dd0260b5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   //const url = "https://newsapi.org/v2/everything?q=tesla&from=2023-03-24&sortBy=publishedAt&apiKey=cc184eb6884c4ffea115dbf569c890cc";
   console.log(url);
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }
  handleNextClick = async () => {
    console.log("next");
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }
  

  render() {
    console.log("rander");
    return (

      <div className='container my-3'>
        <div className="input-box">

          <input

            type="search"

            name="search-form"

            id="search-form"

            className="search-input"

            // onChange={(e) => setSearchQuery(e.target.value)}

            placeholder="Search user"

          />

        </div>
        <h1 className='text-center' style={{ margin: "30px 0px" }}>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 85) : ""}
                imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News;
