import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News=(props)=>{
      const [articles, setArticles] = useState([])
      const [loading, setLoading] = useState(true)
      const [page, setPage] = useState(1)
      const [totalResults, setTotalResults] = useState(0)
      
      
      const capitalize=(string)=>{
        return string.charAt(0).toUpperCase()+ string.slice(1);
      }
    


      useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsApp`;
        Update(); //eslint-disable-line
        }, []);
      
      

      const  Update= async ()=>{
          props.setProgress(20);//it invokes the setProgress method passed down from the parent (App) component.
          const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
          setLoading(true);//It sets loading to true to indicate that data is being fetched.
          let data=await fetch(url);
          props.setProgress(50);
          let parseData=await data.json();
          props.setProgress(80);
          setArticles(parseData.articles);
          setTotalResults(parseData.totalResults);
          setLoading(false);
          
          props.setProgress(100);

        }

      const  fetchMoreData=async()=>{
              const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
              setPage(page + 1);
              let data=await fetch(url);
              let parseData=await data.json();
              console.log(parseData);
              setArticles(articles.concat(parseData.articles));
              setTotalResults(parseData.totalResults);
          
          };
          
          return (
            <>
              <h1 className='text-center' style={{margin: "35px 0px",marginTop:"90px"}}>NewsApp-Top {capitalize(props.category)} Headlines </h1>
              {loading&& <Spinner/>}

              <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length!==totalResults}
                loader={ <Spinner/>}
              >
              <div className="container">
              <div className="row">
                {articles.map((element)=>{
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
 News.defaultProps={ 
  country:"in",
   pageSize:4,
   category:"general"
 }
 News.propTypes={
   country:PropTypes.string,
   pageSize:PropTypes.number,
   category:PropTypes.string
 }
 export default News;
