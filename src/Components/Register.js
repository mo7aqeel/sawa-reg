import React, {useState} from "react";
import Select from "react-select";
import { Pagination } from "react-bootstrap";
import { ref, child, get, set } from "firebase/database";
import { myDb } from '../../src/firebase';


const Register = (props) => {

    const {list, myClick} = props;
    const data = [...list].reverse();
    const [search, setSearch] = useState("");
    const [filteredList, setFilteredList] = useState(data);
    const [deps, setDeps] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [stateReg, setStateReg] = useState("تسجيل");
    const [buttonState, setButtonstate] = useState(false);


    const dbRef = ref(myDb);


    const registerStudentHandler = (dep, name, phone1, phone2, ch, month, day, num) => {

        console.log(dep);
        get(child(dbRef, `system/2023/log/${dep}`)).then((snapshot) => {
            if(snapshot.hasChildren()){
                if(set(child(snapshot.ref, snapshot.size + 1), 
                    {
                        name: name,
                        phone1: phone1,
                        phone2: phone2,
                        dep: dep,

                    }
                )){
                    set(child(dbRef, `system/2023/sub/${ch}/${month}/${day}/${num}/isReg`), "true");
                    let updatedData = data.find(item => item.id == num)
                    updatedData['isReg'] = "true";
            
            }
            }else {
                if(set(child(snapshot.ref, "1"), 
                    {
                        name: name,
                        phone1: phone1,
                        phone2: phone2,
                    }
                )){
                    set(child(dbRef, `system/2023/sub/${ch}/${month}/${day}/${num}/isReg`), "true");
                    let updatedData = data.find(item => item.id == num)
                    updatedData['isReg'] = "true";
                    
            }
            }
        })
    }

    const filterBySearch = (event) => {

        // Access input value
        const query = event.target.value;
        setSearch(query)
        // Create copy of item list
        let updatedList = [...data];
    
        if (query ==""){
         updatedList =data; 
        }
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
          return item.name.includes(query.toLowerCase());
        });
        // Trigger render with updated values
        setFilteredList(updatedList);
      }


      const itemsPerPage = 10;
        const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
        };
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;



    return(
        <div style={{width:"80%",alignItems:'center'}}>
        <h1 style={{color:"#052541"}}>تسجيل الطلاب</h1>
    <div className="table-wrapper">
        <div>
            <button className="Btn" onClick={myClick}>
            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div className="text">رجوع</div>
            </button>

            <div class="group">
                <svg className="icon-control" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                <input placeholder="Search" value={search} type="search" className="input" onChange={filterBySearch}/>
            </div>
        </div>
    <table className="fl-table">
        <thead>
        <tr>
            <th>رقم الاستمارة</th>
            <th>اسم الطالب</th>
            <th>القناة</th>
            <th>القسم</th>
            <th>حالة التسجيل</th>
        </tr>
        </thead>
        <tbody>
        {filteredList.slice(startIndex, endIndex).map((val, index) => {
            let departments = [];
            let value = 1;
            (val.deps).forEach(label => {
                departments.push({value, label})
                value += 1;
            });
            console.log(departments)
                return (
                    <tr key={index}>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.chnnel}</td>
                        <td>{
                            <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isRtl
                            isDisabled={val.isReg== 'true'? true : false}
                            isSearchable={false}
                            name="dep"
                            onChange={(choise) => setDeps(choise.label)}
                            options={departments}
                            required
                          />
                        }</td>
                        <td>
                        <button className={val.isReg == 'false'? "button-reg" : "button-reg-disabled"} disabled={val.isReg == 'true'? true : false} onClick={() => registerStudentHandler(deps, val.name, val.phonef, val.phones, val.chnnel == "القناة العامة"? 'pub' : 'priv', val.month, val.day, val.id)}>
                            <span className="span-reg" style={{fontFamily:'cairo'}}>{val.isReg == 'true'? "تم تسجيل الطالب" : "تسجيل"}</span>
                        </button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
        </table>
        <Pagination style={{marginTop:'64px'}}>
                <Pagination.Next onClick={() => currentPage != Math.ceil(filteredList.length / itemsPerPage)? paginate(currentPage + 1) : false} />
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Prev onClick={() => currentPage != 1? paginate(currentPage - 1): paginate(currentPage)} />
            </Pagination>
        </div>
        </div>
    )
}

export default Register;