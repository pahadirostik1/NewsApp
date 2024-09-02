import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
 
    constructor(){
      super();
      console.log("This is the constructor in News  ");
      this.state={
        articles:[],
        loading:true,
        page:1
      }
    }

   async componentDidMount(){
      let url ="https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=803aabb7d4744bcfb978fdd0a50f8461&page=1&pageSize=4";
      let data=await fetch(url);
      let parseData=await data.json();
      console.log(parseData);
      this.setState({articles:parseData.articles,totalResults:parseData.totalResults})
        
      
    } 
   handlePrevClick= async()=>{
    console.log("Previous");
    let url =`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=803aabb7d4744bcfb978fdd0a50f84611&page=${this.state.page-1}&pageSize=4 `;
    let data=await fetch(url);
    let parseData=await data.json();
    console.log(parseData);
    this.setState({
      page:this.state.page-1,
      articles:parseData.articles
    })


    }
   handleNextClick=async ()=>{
    console.log("Next");
    if(this.state.page+1 > Math.ceil(this.state.totalResults/4)){

    }
    else{
    let url =`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=803aabb7d4744bcfb978fdd0a50f8461&page=${this.state.page+1}&pageSize=4`;
    let data=await fetch(url);
    let parseData=await data.json();
    console.log(parseData);
    this.setState({
      page:this.state.page+1,
      articles:parseData.articles
    })
    }
   }



    render() {
      return (
        <div className='container my-3'>
          <h2>newsApp-Top Headlines</h2>
          <div className="row">
          {this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url} >
                          <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/> 
                      </div>
             
          })};
         </div>
         <div className='container d-flex justify-content-between'>
         <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
         <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </div>
      )
    }
  }

