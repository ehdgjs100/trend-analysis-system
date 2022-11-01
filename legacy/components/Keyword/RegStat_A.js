// file: src/components/PhoneForm.js
import React, { Component } from 'react';
import css from "styled-jsx/css";
import { useState, useEffect } from 'react';
import KeywordTable from './KeywordTable';
import axios from 'axios';
import Router from 'next/router';
import DataTable from 'react-data-table-component';

export function RegStat_A(props) {

  /*구분*/ 
  const [classification,SetClassification] = useState("2");
  const handleClickRadioButton = (e) => {
    console.log(e.target.value)
    SetClassification(e.target.value)
    if(e.target.value === "1"){
      const targetPage = '/KeywordRegStat_K';
      Router.push(targetPage);
    }
  }

  /*키워드*/

  const [state,SetState] = useState(''); // 키워드 속성

  const handleKeyword = (e) => {
    console.log(e.target.value)
    SetState(e.target.value)
  }


  /* 등록 테이블 - 데이터*/

  const regDataList = new Array();
  var idIdx= 1;



  /*등록 버튼 클릭 api */
const regAPI = async() => {
  window.open("/regKeywordAttr", "a", "width=1000, height=400, left=100, top=50");
  
}



/*조회 버튼 클릭 api */
const [tmp,SetTmp] = useState([]);
const [regDate,SetRegDate] = useState('');
const getAPI = async() => {

  const searchData = await axios.get("/api/chart/category?startDate=2022/03/01&endDate=2022/05/28&categoryName="+state);

  console.log(searchData);

  SetTmp(searchData.data.result.searchKeywordInfos)
  SetRegDate(searchData.data.result.createdAt);
  

}


/*'전체' 조회 버튼 클릭 api */
 const getAllAPI  = async() => {
  window.open("/KeywordAttrAll", "a", "width=1000, height=500, left=100, top=50");
}




/*키워드 테이블*/
const columns = [
  {
      name: <h6><strong>키워드 속성</strong></h6>,
      selector: row => '#'+row.keyword,
      style : {fontSize : 15}
  },
  {
    name: <h6><strong>키워드</strong></h6>,
    selector: row => row.keywordAttr,
    style : {fontSize : 15}
 },
  {
     name: <h6><strong>키워드수</strong></h6>,
     selector: row => row.keywordAttr.split(" ").length-1,
     style : {fontSize : 15}
  },
  {
    name: <h6><strong>검색량</strong></h6>,
     selector: row => row.keywordVolume,
     style : {fontSize : 15}
 },
  {
     name: <h6><strong>등록일자</strong></h6>,
      selector: row => row.regDate,
      style : {fontSize : 15}
  },

];




  
  
  


 if (tmp.length>0) {
      
    idIdx = idIdx+1;
    let keywordList = ''
    for (var i = 0; i <tmp.length; i++) {
        keywordList += (tmp[i].keyword + " " )
     }
    regDataList.push(    
      {
      id: idIdx,
      keyword: state,
      keywordVolume: '?',
      keywordAttr: keywordList,
      regDate: regDate,
  })
  

    return (
      <div style={{ fontFamily : 'NanumSquare' }}>
      
      <div className = "mx-3">
            <a className = "mx-0"> 조회 구분 </a>
            <input className = "mx-3"
              type = "radio"
              value = "1"
              checked = {classification === "1"}
              onChange = {handleClickRadioButton}
              />
            <label>
              1. 키워드
            </label>
            <input className = "mx-3"
              type = "radio"
              value = "2"
              checked = {classification === "2"}
              onChange = {handleClickRadioButton}
              />
            <label>
              2. 키워드 속성
            </label>

      
        </div>
      
        <div className = "mx-3"> 
        <form className="form-inline" >
          <a className = "mx-1"> 조회키</a>
          <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 입력" aria-label="Search" 
                 style={{ width : '200px', height : '50px',  fontSize : '20px'}}
                 value={state.name} //입력되는 값.
                 onChange={handleKeyword}/>
      
      
          <div className = "mx-4">
              <button type = "button" className="btn btn-outline-primary mx-2" 
                  style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                  onClick = {getAPI} > 조회 </button>
              <button type = "button" className="btn btn-outline-primary mx-2" 
                  style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                  onClick = {regAPI} > 등록 </button>
             <button type = "button" className="btn btn-outline-primary mx-2" 
                style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                onClick = {getAllAPI}> 전체조회 </button> 
      </div>
      
        
        </form>
        <br />
        
        <DataTable 
                  columns={columns}
                  
                  data={regDataList}
                  selectableRows
                  dense = 'true'
                  />
      
        </div>
        <br />
      
        
      
      
      </div>
      
       
          );
          
    }else{
    
      return (
        <div style={{ fontFamily : 'NanumSquare' }}>
        
        <div className = "mx-3">
              <a className = "mx-0"> 조회 구분 </a>
              <input className = "mx-3"
                type = "radio"
                value = "1"
                checked = {classification === "1"}
                onChange = {handleClickRadioButton}
                />
              <label>
                1. 키워드
              </label>
              <input className = "mx-3"
                type = "radio"
                value = "2"
                checked = {classification === "2"}
                onChange = {handleClickRadioButton}
                />
              <label>
                2. 키워드 속성
              </label>
  
        
    
          </div>
          
    
    
    
          <div className = "mx-3"> 
          <form className="form-inline" >
            <a className = "mx-1"> 조회키</a>
            <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 입력" aria-label="Search" 
                   style={{ width : '200px', height : '50px',  fontSize : '20px'}}
                   value={state.name} //입력되는 값.
                   onChange={handleKeyword}/>
        
        
            <div className = "mx-4">
                <button type = "button" className="btn btn-outline-primary mx-2" 
                    style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                    onClick = {getAPI} > 조회 </button>
                <button type = "button" className="btn btn-outline-primary mx-2" 
                    style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                    onClick = {regAPI} > 등록 </button>
                <button type = "button" className="btn btn-outline-primary mx-2" 
                    style={{ width : '100px', height : '50px',  fontSize : '20px' }}
                    onClick = {getAllAPI}> 전체조회 </button>    
        </div>
        
          
          </form>
          <br />
        
          </div>
          <br />
          
        </div>
        
         
            );
    }
  }
  
    
  

export default RegStat_A;