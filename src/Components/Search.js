// import React from "react";
// import { useState } from "react";
// import Select from "react-select";


// const getNameSearch = (nam) => {
//     return nam
// }
// const Search = (props) => {

//     const {data} = props;
//     const [name, setName] = useState('');
//     const [filteredList, setFilteredList] = useState([])
//     // data.forEach(element => {
//     //     filteredList.push({
//     //         value: element.key,
//     //         label: element.name      
//     //       })
//     // });

//     // const changeNameHandler = (e) => {
//     //     setName(e.target.value);
//     //     getNameSearch(name)
//     // }

    

//     return(
//         <div className="main-search-co">
//             <div className="input-container">
//             <input type="text" value={name} onChange={filter} name="text" className="input-search" placeholder="ابحث عن رقم الاستمارة او اسم الطالب"/>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" className="icon-search"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <rect fill="white" height="24" width="24"></rect> <path fill="" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
//             </div>
//             <div id="item-list">
//                 <ol>
//                     {filteredList.map((item, index) => (
//                     <li key={index}>{item}</li>
//                     ))}
//                 </ol>
//             </div>
// {/* 
//             <Select
//             className="basic-single"
//             classNamePrefix="select"
//             placeholder="ابحث عن اسم الطالب"
//             isClearable
//             isRtl={true}
//             isSearchable
//             name="color"
//             onChange={changeNameHandler}
//             options={filteredList}
//             /> */}
//         </div>
//     )
// }

// export default Search;
