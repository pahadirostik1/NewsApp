import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultProps={
   country:"in",
    pageSize:4,
    category:"general"
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
 
    constructor(){
      super();
      console.log("This is the constructor in News  ");
      this.state={
        articles:[],
        loading:false,
        page:1
      }
    }

   async componentDidMount(){
      let url =` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=803aabb7d4744bcfb978fdd0a50f8461&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data=await fetch(url);
      let parseData=await data.json();
      console.log(parseData);
      this.setState({articles:parseData.articles,
        totalResults:parseData.totalResults,
        loading:false})
        
      
    } 
   handlePrevClick= async()=>{
    console.log("Previous");
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=803aabb7d4744bcfb978fdd0a50f8461&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData=await data.json();
    console.log(parseData);
    this.setState({
      page:this.state.page - 1,
      articles:parseData.articles,
      loading:false
    })
    }
   handleNextClick=async ()=>{
    console.log("Next");
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=803aabb7d4744bcfb978fdd0a50f8461&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
     let data=await fetch(url);
     let parseData=await data.json();
     console.log(parseData);
     this.setState({
        page:this.state.page+1,
        articles:parseData.articles,
        loading:false
    
      })
    }
   }
   render() {
      return (
        <div className='container my-3'>
          <h1 className='text-center'>NewsApp-Top Headlines</h1>
          {this.state.loading&& <Spinner/>}
          <div className="row">
          {!this.state.loading&& this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url} >
                          <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} /> 
                      </div>
             
          })};
         </div>
         <div className='container d-flex justify-content-between'>
         <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
         <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </div>
      )
    }
  }

