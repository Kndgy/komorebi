import React from 'react'
import './App.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import {useQuery} from 'react-query';
import { useSearchParams } from 'react-router-dom';

function App() {

  let [searchParams, setSearchParams] = useSearchParams();
  const request = searchParams.get('keyword')

  function Component() {
    const getData = async () => {
      var headers = {}
      const res = await fetch(`https://jisho.org/api/v1/search/words?keyword=${request}`,{
        credentials: 'same-origin', 
        method : "GET",
        mode: 'cors',
        headers: headers,
      });
      return res.json();
    };
  
    const {data, error, isLoading} = useQuery('words', getData);
    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;
    return (
      data.data[0].slug
    );
  }

  const queryClient = new QueryClient();
  return (
    <div className="App">
      
      <QueryClientProvider client={queryClient}>
      <input
        onChange={(event)=>{
          let keyword = event.target.value;
          if(keyword){
            setSearchParams({keyword});
            Component
          }else{
            setSearchParams({});
          }
        }}
      />
      <br/>
      result:
      <Component/>
      </QueryClientProvider>
    </div>
  )
}

export default App
