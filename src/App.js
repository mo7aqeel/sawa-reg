import './App.css';
import ChooserContainer from './Components/ChooserContainer';
import Chooser from './Components/Chooser';
import { useState } from 'react';
import Select from "react-select";
import RowContainer from './Components/RowContainer';
import { ReactComponent as Logo } from './img.svg';
import { ReactComponent as CancelSearch } from './no-result.svg';
import { ReactComponent as Control } from './control.svg';
import { ReactComponent as User } from './user.svg';
import { ref, child, get, set } from "firebase/database";
import { myDb } from './firebase';
import Loading from './Components/Loading';
import Number from './Components/Number';
import Error from './Components/Error';
import ControlView from './Components/ControlView';
import Register from './Components/Register';
import StudentInfo from './Components/StudentInfo';



function App() {

  const channel = [
    {value: "pub", label: "القناة العامة"},
    {value: "priv", label:"القناة الخاصة"}
    ];

  const types = [
    {value: 'sh', label: "ذوي الشهداء"},
    {value: 'mr', label: "أبناء الأساتذة"},
    {value: 'pr', label: "السجناء السياسيين"}
  ];
  

  const [isRtl, setIsRtl] = useState(false);
  const [isSearchable, setIsSearchable] = useState(false);
  const [isClearable, setIsClearable] = useState(false);
  const [isControl, setIsControl] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
    
  const [channelSelector, setChannelSelector] = useState("pub");
  const [studentName, setStudentName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [home, setHome] = useState("");
  const [examNumer, setExamNumber] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [departments, setDepartments] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [studentUserName, setStudentUserName] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [secretNumber, setSecretNumber] = useState("");
  const [stateAccount, setStateAccount] =  useState("مفعل");
  const [checked, setChecked] = useState(true);
  const [relationType, setRelationType] = useState("")
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [idp, setIdp] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([])
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [dateMonth, setDateMonth] = useState("")
  const [dateDay, setDateDay] = useState("");
  const [accpetTextButton, setAccpetTextButton] = useState("قبول");



    const department = [
        {value: 0, label: "البصريات صباحي"},
        {value: 1, label: "البصريات مسائي"},
        {value: 2, label: "المختبرات الطبية صباحي"},
        {value: 3, label: "المختبرات الطبية مسائي"},
        {value: 4, label: "الادارة الصحية صباحي"},
        {value: 5, label: "الادارة الصحية مسائي"},
        {value: 6, label: "تقنيات التخدير صباحي"},
        {value: 7, label: "تقنيات الاشعة صباحي"},
        {value: 8, label: "القانون صباحي"},
        {value: 9, label: "القانون مسائي"},
        {value: 10, label: "اللغة العربية صباحي"},
        {value: 11, label: "اللغة الانكليزية صباحي"},
        {value: 12, label: "اللغة الانكليزية مسائي"},
        {value: 13,label: "علوم القران صباحي"}
    ]

    const dbRef = ref(myDb);


    // هل الحساب مفعل؟
  const setCheckedHandler = state => {
    setChecked(state);
    if (state){
        setStateAccount("مفعل");
    } else{
        setStateAccount("غير مفعل");
    }
  }


  // ادخال اسم المستخدم
  const changeUserNameHandler = (event) => {
    setUserName(event.target.value);
  }

  // ادخال كلمة السر
  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  }

  // Student name
  const changeStudentNameHandler = (e) => {
    setStudentName(e.target.value)
  }

  //Mother name
  const changeMotherNameHandler = (e) =>{
    setMotherName(e.target.value)
  }

  //Home
  const changeHomeHandler = (e) => {
    setHome(e.target.value)
  }

  const changeExamNumHandler = e => {
    setExamNumber(e.target.value)
  }

  const changePhone1Handler = e => {
    setPhone1(e.target.value)
  }

  const changePhone2Handler = e => {
    setPhone2(e.target.value)
  }

  const changeDepartmentHandler = e => {
    setDepartments(Array.isArray(e) ? e.map(x => x.label) : []);
  }

  const changeStudentUserNameHandler = e => {
    setStudentUserName(e.target.value)
  }

  const changeStudentPasswordHandler = e => {
    setStudentPassword(e.target.value);
  }

  const changeSecretNumHandler = e => {
    setSecretNumber(e.target.value)
  }
  
  const changetNotesHandler =  e => {
    setNotes(e.target.value)
  }

  const changeRelationHandler = e => {
    setRelationType(e.target.value);
  }

  const setControlViewHandler = () => {
    setIsControl(true);
  }

  const getStudentIfoHandler = () => {
    setIsInfo(true);
    setIsRegister(false);
    setIsControl(false);

  }



  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    setSearch(query)
    // Create copy of item list
    let updatedList = [...data];

    if (query ==""){
     updatedList =[]; 
    }
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.name.includes(query.toLowerCase());
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  }


  const getDataFromFirebase = () => {
    let list = []
    channel.forEach(element => {
      get(child(dbRef, `system/2023/sub/${element.value}`)).then(snapshot => {
        snapshot.forEach(z => { z.forEach(y => {y.forEach(x => { 
          list.push({
            id: x.child('id').val(),
            name: x.child("name").val(),
            chnnel: x.child("channel").val(),
            mother: x.child("mother").val(),
            hom: x.child("hom").val(),
            exam: x.child("exam").val(),
            phonef: x.child("phonef").val(),
            phones: x.child("phones").val(),
            deps: x.child("deps").val(),
            usern: x.child("usern").val(),
            pass: x.child("pass").val(),
            secnum: x.child("secnum").val(),
            accstate: x.child("accstate").val(),
            note: x.child("note").val(),
            entry: x.child("entry").val(),
            typech: x.child("typech").val(),
            relation: x.child("relation").val(),
            date: x.child('date').val(),
            day: x.child("day").val(),
            month: x.child("month").val(),
            isReg: x.child('isReg').val()
        })})})
        })
      })
    });
    setData(list);
  }

  const getSearchedName = (idd, chann, mo, da) => {
    setIsSearchable(true);
    setIsLoading(true)
    console.log("idd" + idd)
    console.log(chann)
    let ch = chann == "القناة العامة"? "pub": "priv"
    get(child(dbRef, `system/2023/sub/${ch}/${mo}/${da}/${idd.toString()}`)).then((snapshot) => {
      setChannelSelector(ch)
      setStudentName(snapshot.child('name').val());
      setMotherName(snapshot.child("mother").val());
      setHome(snapshot.child("hom").val());
      setExamNumber(snapshot.child("exam").val());
      setPhone1(snapshot.child("phonef").val());
      setPhone2(snapshot.child("phones").val());
      setDepartments(snapshot.child("deps").val());
      setStudentUserName(snapshot.child("usern").val());
      setStudentPassword(snapshot.child("pass").val());
      setSecretNumber(snapshot.child("secnum").val())
      setChecked(snapshot.child("accstate").val() == "مفعل"? true: false);
      setNotes(snapshot.child("note").val());
      setType(snapshot.child("typech").val());
      setDate(snapshot.child("date").val())
      setDateDay(da);
      setDateMonth(mo);
      setIdp(idd);
      setIsLoading(false)
      setFilteredList([])
      setAccpetTextButton("تحديث")
    })
  }


  const okAddDataHandler = () => {
    setStudentName("");
    setMotherName("");
    setHome("");
    setExamNumber("");
    setPhone1("");
    setPhone2("");
    setDepartments([]);
    setStudentUserName("");
    setStudentPassword("");
    setExamNumber("");
    setSecretNumber("")
    setChecked(true);
    setNotes("");
    setType("");
    setIsAdd(false);
    setSearch("");
    setIsSearchable(false)
    setAccpetTextButton("قبول")
    setDate("")

  }

  //اضافة بيانات
  const acceptStudentHandler = () => {
    if (!isSearchable){
      if (channelSelector == "priv"){
        if (type == ""){
          setIsError(true);
          return
        }
      }
      if (studentName == "" || departments.length == 0){
        setIsError(true);
      } else{
      setIsLoading(true);
      let snap = 1;
      let counter = 1;
      get(child(dbRef, `system/2023/sub/${channelSelector}`)).then((snapshot) => {
        if(snapshot.hasChildren()){
          snapshot.forEach(item => {
            counter += 1;
            item.forEach(element => {
              snap += element.size;
              console.log(element.id)
              console.log(snap)
            })
            if (channelSelector == 'priv'){
              snap += " - خ"
            }
          })
        }else{
        snap = channelSelector == "pub"? snapshot.size + 1 : snapshot.size + 1 + ' - خ';
      }
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
            if(set(child(snapshot.ref , `${month}/${day}/${snap.toString()}`), {
              id: snap,
              channel: channelSelector == 'priv'? "القناة الخاصة": "القناة العامة",
              name: studentName,
              mother: motherName,
              hom: home,
              exam: examNumer,
              phonef: phone1,
              phones: phone2,
              deps: departments,
              usern: studentUserName,
              pass: studentPassword,
              secnum: secretNumber,
              accstate: stateAccount,
              note: notes,
              entry: userName,
              typech: type,
              relation: relationType,
              day: day,
              month: month,
              date: new Date().toString(),
              isReg: "false"
            })) {
              setIsLoading(false);
              setIdp(snap)
              setIsAdd(true);
              const updatedData = [...data, 
                {id: snap,
                  chnnel: channelSelector == 'priv'? "القناة الخاصة": "القناة العامة",
                  name: studentName,
                  mother: motherName,
                  hom: home,
                  exam: examNumer,
                  phonef: phone1,
                  phones: phone2,
                  deps: departments,
                  usern: studentUserName,
                  pass: studentPassword,
                  secnum: secretNumber,
                  accstate: stateAccount,
                  note: notes,
                  entry: userName,
                  typech: type,
                  date: new Date().toString(),
                  day: day,
                  month: month,
                  isReg: "false",
                  relation: relationType}];
              
              setData(updatedData);
            }
            
      })}} else{
        console.log(idp)
        if (channelSelector == "priv"){
          if (type == ""){
            setIsError(true);
          }
        }
        if (studentName == "" || departments.length == 0){
          setIsError(true);
        } else{
        setIsLoading(true);
        if(set(child(dbRef, `system/2023/sub/${channelSelector}/${dateMonth}/${dateDay}/${idp}`), {
           channel: channelSelector == 'priv'? "القناة الخاصة": "القناة العامة",
           name: studentName,
           mother: motherName,
           hom: home,
           exam: examNumer,
           phonef: phone1,
           phones: phone2,
           deps: departments,
           usern: studentUserName,
           pass: studentPassword,
           secnum: secretNumber,
           accstate: stateAccount,
           note: notes,
           entry: userName,
           day: dateDay,
           month: dateMonth,
           typech: type,
           date: new Date().toString(),
           id: idp,
           isReg: "false",
           relation: relationType}))
          {
           setIsLoading(false);
           setIsAdd(true);
           let updatedData = data.find(item => item.id == idp)
           updatedData['name'] = studentName;
           updatedData['mother'] = motherName;
           updatedData['hom'] = home;
           updatedData['exam'] = examNumer;
           updatedData['phonef'] = phone1;
           updatedData['phones'] = phone2;
           updatedData['deps'] = departments;
           updatedData['usern'] = studentUserName;
           updatedData['pass'] = studentPassword;
           updatedData['secnum'] = secretNumber;
           updatedData['accstate'] = stateAccount;
           updatedData['note'] = notes;
           updatedData['entry'] = userName;
           updatedData['typech'] = type;
           updatedData['relation'] = relationType;
           updatedData['date'] = date;
           
            }
              
      }
  }}

  const cancelSearchHandler = () => {
    setStudentName("");
    setMotherName("");
    setHome("");
    setExamNumber("");
    setPhone1("");
    setPhone2("");
    setDepartments([]);
    setStudentUserName("");
    setStudentPassword("");
    setExamNumber("");
    setSecretNumber("")
    setChecked(true);
    setNotes("");
    setIdp("");
    setDate("");
    setType("");
    setIsAdd(false);
    setSearch("");
    setIsSearchable(false)
    setFilteredList([])
    setAccpetTextButton("قبول")
  }



  // التخقق من تسجيل الدخول
  const loginHandler = () => {
    getDataFromFirebase();
    setIsLoading(true);
    get(child(dbRef, 'users')).then((snapshot) => {
      const snapSize = snapshot.size;
      let i = 0;
      let state = false;
      if (snapshot.exists()) {snapshot.forEach(childSnap => {
        i+=1;
          if(userName == childSnap.child('username').val() && password == childSnap.child('password').val()){
            console.log("Successed")
            setIsLogin(true);
            setIsLoading(false)
            state = true;
            return;
          } else if(i == snapSize && !state){
            setIsLoading(false)
            setInvalidUser(true);
          }
          
        });
      } else {
      }
      }).catch((error) => {
      console.error(error);
    });

  }

  const backClickHandler = () => {
    setIsControl(false);
    setIsRegister(false);
    setIsInfo(false);
    setIsLogin(true);
  }


  //Search View
  const getSearchView = () => {
    return(
      <div className="main-search-co">
        <div className="input-container">
          <input type="text" value={search} onChange={filterBySearch} name="text" className="input-search" placeholder="ابحث عن اسم الطالب"/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" className="icon-search"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <rect fill="white" height="24" width="24"></rect> <path fill="" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
          </div>
          <div id="item-list">          
                  {filteredList.map((item) => (
                  <button className="cta" onClick={() => getSearchedName(item.id, item.chnnel, item.month, item.day)}>
                    <span className="hover-underline-animation">{item.name}</span>
                    <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                        <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                    </svg>
                  </button>   
                  ))}
              
        </div>
      </div>
    )
  }
  // عرض القناة الخاصة
  const getPrivateInfoHandler = () => {
    
    const getRelationHandler = () => {
      return(
        <div className='two'>
            <label for='relation' className="inputLabel">صلة القرابة</label>
            <input disabled={isAdd} onChange={changeRelationHandler} value={relationType} type="text" name='relation' className="textInput" placeholder="صلة القرابة" style={{width: '90%'}} required/>
          </div>
      )
    }
    return(
      <div>
       <RowContainer>
        <div className='one'>
          <label for="department" className="inputLabel" style={{fontSize:16, textAlign:"center", padding:8}}>نوع القناة <span style={{color:'red'}}>*</span></label>
            <Select
            className="basic-single"
            classNamePrefix="select"
            isRtl
            isSearchable={false}
            name="color"
            value={types.filter(obj => type.includes(obj.label))}
            onChange={(choise) => setType(choise.label)}
            options={types}
            required
            isDisabled={isAdd}
          />
        </div>
        {type == 'ذوي الشهداء'? getRelationHandler(): true}
        
      </RowContainer>
      <br/>
      <br/>
      </div>
    )
  }

  // اختيار نوع القناة
  const selectSelectorHandler = (selectorValue) => {
    setChannelSelector(selectorValue);
    console.log(selectorValue)
  }



  const mainChannel = () => {
    return(

        <div className="co-container">
          <div className='searchCont'>
            {getSearchView()}
            <div className='cancelImg' onClick={cancelSearchHandler}>
            <CancelSearch/>
            </div>
            {userName == 'mo7'?<div className='controlImg' onClick={setControlViewHandler}><Control/></div> : false}
            <button className="cta-reg" onClick={() => {setIsRegister(true)}}>
              <span>تسجيل الطلاب</span>
              <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
            <div className='userImg' onClick={getStudentIfoHandler}>
              <User/>
            </div>
          </div>
          <ChooserContainer>
          {
            channel.map(sec => <Chooser title={sec.label} active={sec.value === channelSelector} selectorClick={() => selectSelectorHandler(sec.value)}/>)
          }
        </ChooserContainer>

        {channelSelector ==='priv'? getPrivateInfoHandler(): true}

          <RowContainer>

            <div className='one'>
              <label for='studentName' className="inputLabel">اسم الطالب <span style={{color:'red'}}>*</span></label>
              <input type="text" onChange={changeStudentNameHandler} value={studentName} name='studentName' className="textInput" placeholder="اسم الطالب" style={{width: '90%'}} required disabled={isAdd}/>
            </div>

            <div className='two'>
              <label for='motherName' className="inputLabel">سنة التولد</label>
              <input type="text" disabled={isAdd} value={motherName} onChange={changeMotherNameHandler} name='motherName' className="textInput" placeholder="مواليد الطالب" style={{width: '90%'}}/>
            </div>
      
          </RowContainer>


          <RowContainer>

            <div className='one'>
              <label for='home' className="inputLabel">محل السكن</label>
              <input type="text" value={home} disabled={isAdd} onChange={changeHomeHandler} name='home' className="textInput" placeholder="محل السكن" style={{width: '90%'}}/>
            </div>

            <div className='two'>
              <label for='examNumber' className="inputLabel">الرقم الامتحاني</label>
              <input type="number" value={examNumer} disabled={isAdd} onChange={changeExamNumHandler} name='examNumber' className="textInput" placeholder="الرقم الامتحاني" style={{width: '90%'}}/>
            </div>

            </RowContainer>

            <RowContainer>

            <div className='one'>
              <label for='phone1' className="inputLabel">رقم الهاتف1</label>
              <input disabled={isAdd} value={phone1} type="number" onChange={changePhone1Handler} name='phone1' className="textInput" placeholder="رقم الهاتف" style={{width: '90%'}}/>
            </div>

            <div className='two'>
              <label for='phone2' className="inputLabel">رقم الهاتف2</label>
              <input disabled={isAdd} value={phone2} type="number" onChange={changePhone2Handler} name='phone2' className="textInput" placeholder="رقم الهاتف" style={{width: '90%'}}/>
            </div>

            </RowContainer>

          <br/>
          <br/>

          <div>
              <label for="department" className="inputLabel" style={{fontSize:18, textAlign:"center"}}>الأقسام العلمية <span style={{color:'red'}}>*</span></label>
              <br/>
              <Select
                  isMulti
                  name="department"
                  isClearable={isClearable}
                  options={department}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={department.filter(obj => departments.includes(obj.label))}
                  onChange={changeDepartmentHandler}
                  isDisabled={isAdd}
              />
          </div>

          <br/>

          <RowContainer>
            <div className='one'>
              <label for='username' className="inputLabel">اسم المستخدم</label>
              <input type="text" value={studentUserName} disabled={isAdd} onChange={changeStudentUserNameHandler} name='username' className="textInput" placeholder="اسم المستخدم" style={{width: '90%'}} required />
            </div>

            <div className='two'>
              <label for='password' className="inputLabel">كلمة السر</label>
              <input type="text" value={studentPassword} disabled={isAdd} onChange={changeStudentPasswordHandler} name='password' className="textInput" placeholder="كلمة السر" style={{width: '90%'}} required/>
            </div>

          </RowContainer>


          <RowContainer>

            <div className='one'>
              <label  className="inputLabel">الرقم السري</label>
              <input type="number" value={secretNumber} disabled={isAdd} onChange={changeSecretNumHandler} name='secretNumber' className="textInput" placeholder="الرقم السري" style={{width: '90%'}}/>
            </div>

            <div className='two'>
              <div style={{display: 'inline-flex', alignItems: 'center'}}>
                  <p className="inputLabel" style={{marginRight:"24px"}}>حالة الحساب</p><br/>
                  <input disabled={isAdd} checked={checked} type="checkbox" onChange={() => setCheckedHandler(!checked)} style={{transform: "scale(1.5)", marginRight: "16px", cursor:"pointer"}} name="state"/>
                  <p for="state" className="inputLabel">{stateAccount}</p>
              </div>
            </div>

          </RowContainer>

          <div >
            <p for="name" className="inputLabel">الملاحظات</p>
            <textarea disabled={isAdd} value={notes} style={{fontSize:16, textAlign:"right", fontFamily:'cairo', width: '95%'}} onChange={changetNotesHandler} className="notesArea" name="notes"/>
          </div>

              <br/>
              <br/>
              <div className='button-container'>
              <button className={channelSelector==='pub'? "button-51": "button-52"} role="button" onClick={acceptStudentHandler} disabled={isAdd}>{accpetTextButton}</button>
              </div>
          </div>
    )
  }

  //صفحة تسجيل الدخول
  const loginPage = () => {
    return(
      <div className='login'>
        { invalidUser? <Error title="خطأ في اسم المستخدم او كلمة السر" xClick={() => setInvalidUser(false)}/>: true }
        <div style={{width:'100%', display:'inline-flex'}}>
          <div className='login-image'>
            <Logo/>
          </div>
          <div className='login-info'>
            <h1>تسجيل الدخول</h1>
            <br/>
            <input type="text" name='e-username' onChange={changeUserNameHandler} className='login-input' placeholder="اسم المستخدم" style={{width: '90%'}}/>
            <br/>
            <br/>
            <input type="password" name='e-password' onChange={changePasswordHandler} className='login-input' placeholder="كلمة السر" style={{width: '90%'}}/>
            <br/>
            <br/>
            <a href='#'><button className="button-login" role="button" onClick={loginHandler}>تسجيل الدخول</button></a>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="App">
      <header className="main-header">
        <div className='flex-header'>
        <div class="header">
            <h1 class="mt">جامعة ساوة الأهلية</h1>
            <h1 id="mainT">نظام التسجيل الداخلي</h1>
          </div>
          </div>
      </header>

      <div className='content'>
        { isAdd? <Number num={idp} myClick={okAddDataHandler}/> : true }
        { isLoading? <Loading/> : true }
        { !isLogin? loginPage(): isControl? <ControlView list={data} myClick={backClickHandler}/> : isRegister? <Register list={data} myClick={backClickHandler}/> : isInfo? <StudentInfo list={data} myClick={backClickHandler}/> : mainChannel() }
        { isError? <Error title="يجب ملأ الحقول المطلوبة" xClick={() => setIsError(false)}/> : true}


      </div>
    </div>
  );
}

export default App;
