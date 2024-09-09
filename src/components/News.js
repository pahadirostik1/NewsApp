import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


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
  capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }
    constructor(props){
      super(props);
      console.log("This is the constructor in News  ");
      this.state={
        articles:[], // An empty array that will eventually hold the news articles fetched from the API.
        loading:true,
        page:1, // Set to 1, representing the current page of results.
        totalResults:0   //Total number of articles available
       
      }
      document.title=`${this.capitalize(this.props.category)}-NewsApp`;
    } 

   async componentDidMount(){
       this.Update();
   } 
    async Update(){
      this.props.setProgress(20);//it invokes the setProgress method passed down from the parent (App) component.
      const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=803aabb7d4744bcfb978fdd0a50f8461&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});//It sets loading to true to indicate that data is being fetched.
      let data=await fetch(url);
      this.props.setProgress(50);
      let parseData=await data.json();
      this.props.setProgress(80);
      console.log(parseData);
      this.setState({ //Once the data is received and parsed into JSON, the component's state is updated with
        articles:parseData.articles, //An array of the fetched news articles.
        totalResults:parseData.totalResults,
        loading:false  // Set to false to indicate that data loading is complete.
      })
      this.props.setProgress(100);

    }
    fetchMoreData=async()=>{
    
         this.setState({page:this.state.page + 1});
         const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=803aabb7d4744bcfb978fdd0a50f8461&page=${this.state.page}&pageSize=${this.props.pageSize}`;
         
        let data=await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        this.setState({
          articles:this.state.articles.concat(parseData.articles),
          totalResults:parseData.totalResults,
          
          
        })
      
    }
       render() {
      return (
        <>
          <h1 className='text-center'>NewsApp-Top {this.capitalize(this.props.category)} Headlines </h1>
          {this.state.loading&& <Spinner/>}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!==this.state.totalResults}
            loader={ <Spinner/>}
          >
          <div className="container">
          <div className="row">
            { this.state.articles.map((element)=>{
                return  <div className="col-md-4" key={element.source.name} >
                            <NewsItem  title={element.title?element.title:""} 
                          description={element.description?element.description:""} 
                          imageUrl={element.urlToImage} 
                          newsUrl={element.url} 
                          author={element.author}
                           date={element.publishedAt} /> 
             </div>
              })}
          </div>
          </div>
         </InfiniteScroll>
        
        </>
      )
    }
  }

