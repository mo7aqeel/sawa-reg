import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import { ReactComponent as Anal } from "./analytics.svg";
import Select from "react-select";




const ControlView = (props) => {

    const {list, myClick} = props;
    const data = [...list].reverse();
    const [search, setSearch] = useState("");
    const [filteredList, setFilteredList] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateAnal, setDateAnal] = useState("");
    const [specDate, setSpecDate] = useState("");
    
    const [isAnal, setIsAnal] = useState(false);

    const [oM, setOM] = useState(0);
    const [oE, setoE] = useState(0);
    const [mM, setmM] = useState(0);
    const [mE, setmE] = useState(0);
    const [hM, setHM] = useState(0);
    const [hE, setHE] = useState(0);
    const [aM, setAM] = useState(0);
    const [rM, setRM] = useState(0);
    const [ar, setAR] = useState(0);
    const [qr, setQR] = useState(0);
    const [eM, setEM] = useState(0);
    const [eE, setEE] = useState(0);
    const [lM, setLM] = useState(0);
    const [lE, setLE] = useState(0);



    let opticM = [];
    let opticE = [];
    let medicalM = [];
    let medicalE = [];
    let healthM = [];
    let healthE = [];
    let anseth = [];
    let radio = [];

    let arabic = [];
    let quran = [];
    let englishM = [];
    let englishE = [];

    let lawM = [];
    let lawE = [];

    const analDate = [
        {value: 'today', label: "اليوم"},
        {value: 'yesterday', label: 'البارحة'},
        {value: 'month', label: 'هذا الشهر'},
        {value: 'all', label: 'العدد الكلي'},
        {value: 'date', label: 'تاريخ محدد'}
    ]



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

        const emptyAna = () => {
            setOM(0)
            setoE(0)
            setmM(0)
            setmE(0)
            setHM(0)
            setHE(0)
            setAM(0)
            setRM(0)
            setAR(0)
            setQR(0)
            setEM(0)
            setEE(0)
            setLM(0)
            setLE(0)
        }

    if(!isAnal){
        return(
            <div style={{width:"80%",alignItems:'center'}}>
                <div style={{width: '100%', display:'inline-block', alignItems:"center"}}>
                    <div style={{width:'60px', float:"left", marginTop:"24px", cursor:'pointer'}} onClick={() => setIsAnal(true)}>
                        <Anal/>
                    </div>
                    <h1 style={{color:"#052541"}}>مراقبة عمليات النظام</h1>
                </div>
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
                    <th>المدخل</th>
                    <th>تاريخ اخر تعديل</th>
                </tr>
                </thead>
                <tbody>
                {filteredList.slice(startIndex, endIndex).map((val, index) => {
                        return (
                            <tr key={index}>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                                <td>{val.chnnel}</td>
                                <td>{val.entry}</td>
                                <td>{val.date}</td>
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
    }else {

        const changeDateHandler = e => {
            setDateAnal(e.label)
            
            if(e.label == "اليوم"){
                emptyAna();

                let oMm = 0;
                let oEe = 0;
                let mMm = 0;
                let mEe = 0;
                let hMm = 0;
                let hEe = 0;
                let am = 0;
                let rm = 0;
                let arm = 0;
                let qm = 0;
                let eMm = 0;
                let eEe = 0;
                let lMm = 0;
                let lEe = 0;

                opticM.map(val => {
                    if (val.day == new Date().getDate()){
                        oMm += 1;
                        setOM(oMm);
                    }//end if
                })//end map()

                opticE.map(val => {
                    if (val.day == new Date().getDate()){
                        oEe += 1;
                        setoE(oEe);
                    }//end if
                })//end map()

                medicalM.map(val => {
                    if (val.day == new Date().getDate()){
                        mMm += 1;
                        setmM(mMm);
                    }//end if
                })//end map()

                medicalE.map(val => {
                    if (val.day == new Date().getDate()){
                        mEe += 1;
                        setmE(mEe);
                    }//end if
                })//end map()

                healthM.map(val => {
                    if (val.day == new Date().getDate()){
                        hMm += 1;
                        setHM(hMm);
                    }//end if
                })//end map()

                healthE.map(val => {
                    if (val.day == new Date().getDate()){
                        hEe += 1;
                        setHE(hEe);
                    }//end if
                })//end map()

                anseth.map(val => {
                    if (val.day == new Date().getDate()){
                        am += 1;
                        setAM(am);
                    }//end if
                })//end map()

                radio.map(val => {
                    if (val.day == new Date().getDate()){
                        rm += 1;
                        setRM(rm);
                    }//end if
                })//end map()

                arabic.map(val => {
                    if (val.day == new Date().getDate()){
                        arm += 1;
                        setAR(arm);
                    }//end if
                })//end map()

                quran.map(val => {
                    if (val.day == new Date().getDate()){
                        qm += 1;
                        setQR(qm);
                    }//end if
                })//end map()

                englishM.map(val => {
                    if (val.day == new Date().getDate()){
                        eMm += 1;
                        setEM(eMm);
                    }//end if
                })//end map()

                englishE.map(val => {
                    if (val.day == new Date().getDate()){
                        eEe += 1;
                        setEE(eEe);
                    }//end if
                })//end map()

                lawM.map(val => {
                    if (val.day == new Date().getDate()){
                        lMm += 1;
                        setLM(lMm);
                    }//end if
                })//end map()

                lawE.map(val => {
                    if (val.day == new Date().getDate()){
                        lEe += 1;
                        setLE(lEe);
                    }//end if
                })//end map()

            }//end if
            else if(e.label == "البارحة"){
                emptyAna();
                let oMm = 0;
                let oEe = 0;
                let mMm = 0;
                let mEe = 0;
                let hMm = 0;
                let hEe = 0;
                let am = 0;
                let rm = 0;
                let arm = 0;
                let qm = 0;
                let eMm = 0;
                let eEe = 0;
                let lMm = 0;
                let lEe = 0;

                opticM.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        oMm += 1;
                        setOM(oMm);
                        console.log(val.day + " Name: " + val.name)
                    }//end if
                })//end map()

                opticE.map(val => {
                    if (val.day == new Date().getDate() -1){
                        oEe += 1;
                        setoE(oEe);
                    }//end if
                })//end map()

                medicalM.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        mMm += 1;
                        setmM(mMm);
                    }//end if
                })//end map()

                medicalE.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        mEe += 1;
                        setmE(mEe);
                    }//end if
                })//end map()

                healthM.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        hMm += 1;
                        setHM(hMm);
                    }//end if
                })//end map()

                healthE.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        hEe += 1;
                        setHE(hEe);
                    }//end if
                })//end map()

                anseth.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        am += 1;
                        setAM(am);
                    }//end if
                })//end map()

                radio.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        rm += 1;
                        setRM(rm);
                    }//end if
                })//end map()

                arabic.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        arm += 1;
                        setAR(arm);
                    }//end if
                })//end map()

                quran.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        qm += 1;
                        setQR(qm);
                    }//end if
                })//end map()

                englishM.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        eMm += 1;
                        setEM(eMm);
                    }//end if
                })//end map()

                englishE.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        eEe += 1;
                        setEE(eEe);
                    }//end if
                })//end map()

                lawM.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        lMm += 1;
                        setLM(lMm);
                    }//end if
                })//end map()

                lawE.map(val => {
                    if (val.day == new Date().getDate() - 1){
                        lEe += 1;
                        setLE(lEe);
                    }//end if
                })//end map()

            }//end ise if

            else if(e.label == "العدد الكلي"){
                    emptyAna();
                    let oMm = 0;
                    let oEe = 0;
                    let mMm = 0;
                    let mEe = 0;
                    let hMm = 0;
                    let hEe = 0;
                    let am = 0;
                    let rm = 0;
                    let arm = 0;
                    let qm = 0;
                    let eMm = 0;
                    let eEe = 0;
                    let lMm = 0;
                    let lEe = 0;
    
                    opticM.map(val => {
                            oMm += 1;
                            setOM(oMm);
                            console.log(val.day + " Name: " + val.name)
                    })//end map()
    
                    opticE.map(val => {
                            oEe += 1;
                            setoE(oEe);
                    })//end map()
    
                    medicalM.map(val => {
                            mMm += 1;
                            setmM(mMm);
                    })//end map()
    
                    medicalE.map(val => {
                            mEe += 1;
                            setmE(mEe);
                    })//end map()
    
                    healthM.map(val => {
                            hMm += 1;
                            setHM(hMm);
                    })//end map()
    
                    healthE.map(val => {
                            hEe += 1;
                            setHE(hEe);
                    })//end map()
    
                    anseth.map(val => {
                            am += 1;
                            setAM(am);
                    })//end map()
    
                    radio.map(val => {
                            rm += 1;
                            setRM(rm);
                    })//end map()
    
                    arabic.map(val => {
                            arm += 1;
                            setAR(arm);
                    })//end map()
    
                    quran.map(val => {
                            qm += 1;
                            setQR(qm);
                    })//end map()
    
                    englishM.map(val => {
                            eMm += 1;
                            setEM(eMm);
                    })//end map()
    
                    englishE.map(val => {
                            eEe += 1;
                            setEE(eEe);
                    })//end map()
    
                    lawM.map(val => {
                            lMm += 1;
                            setLM(lMm);
                    })//end map()
    
                    lawE.map(val => {
                            lEe += 1;
                            setLE(lEe);
                    })//end map()
    
                }//end ise if
            

            else if(e.label == "هذا الشهر"){
                emptyAna();
                let oMm = 0;
                let oEe = 0;
                let mMm = 0;
                let mEe = 0;
                let hMm = 0;
                let hEe = 0;
                let am = 0;
                let rm = 0;
                let arm = 0;
                let qm = 0;
                let eMm = 0;
                let eEe = 0;
                let lMm = 0;
                let lEe = 0;

                opticM.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        oMm += 1;
                        setOM(oMm);
                        console.log(val.day + " Name: " + val.name)
                    }//end if
                })//end map()

                opticE.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        oEe += 1;
                        setoE(oEe);
                    }//end if
                })//end map()

                medicalM.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        mMm += 1;
                        setmM(mMm);
                    }//end if
                })//end map()

                medicalE.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        mEe += 1;
                        setmE(mEe);
                    }//end if
                })//end map()

                healthM.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        hMm += 1;
                        setHM(hMm);
                    }//end if
                })//end map()

                healthE.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        hEe += 1;
                        setHE(hEe);
                    }//end if
                })//end map()

                anseth.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        am += 1;
                        setAM(am);
                    }//end if
                })//end map()

                radio.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        rm += 1;
                        setRM(rm);
                    }//end if
                })//end map()

                arabic.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        arm += 1;
                        setAR(arm);
                    }//end if
                })//end map()

                quran.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        qm += 1;
                        setQR(qm);
                    }//end if
                })//end map()

                englishM.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        eMm += 1;
                        setEM(eMm);
                    }//end if
                })//end map()

                englishE.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        eEe += 1;
                        setEE(eEe);
                    }//end if
                })//end map()

                lawM.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        lMm += 1;
                        setLM(lMm);
                    }//end if
                })//end map()

                lawE.map(val => {
                    if (val.month == new Date().getMonth() +1){
                        lEe += 1;
                        setLE(lEe);
                    }//end if
                })//end map()

            }//end ise if
            else if(e.label == "تاريخ محدد"){
                emptyAna();
            }
        }//end changeDateHandler()

        const searchSpecDate = () => {
            console.log("Clickeeed")
            emptyAna();

            let oMm = 0;
            let oEe = 0;
            let mMm = 0;
            let mEe = 0;
            let hMm = 0;
            let hEe = 0;
            let am = 0;
            let rm = 0;
            let arm = 0;
            let qm = 0;
            let eMm = 0;
            let eEe = 0;
            let lMm = 0;
            let lEe = 0;

            let i = specDate.indexOf('/');
            let day = "";
            let month = "";
            for (let index = 0; index < i; index++) {
              const element = specDate[index];
               day += element;
            }
            for (let index = i+1; index < specDate.length; index++) {
                const element = specDate[index];
                 month += element;
              }
            opticM.map(val => {
                if (val.month == month && val.day == day){
                    oMm += 1;
                    setOM(oMm);
                }//end if
            })//end map()
            opticE.map(val => {
                if (val.month == month && val.day == day){
                    oEe += 1;
                    setoE(oEe)
                }//end if
            })//end map()
            medicalM.map(val => {
                if (val.month == month && val.day == day){
                    mMm += 1;
                    setmM(mMm);
                }//end if
            })//end map()
            medicalE.map(val => {
                if (val.month == month && val.day == day){
                    mEe += 1;
                    setmE(mEe);
                }//end if
            })//end map()
            healthM.map(val => {
                if (val.month == month && val.day == day){
                    hMm += 1;
                    setHM(hMm);
                }//end if
            })//end map()
            healthE.map(val => {
                if (val.month == month && val.day == day){
                    hEe += 1;
                    setHE(hEe);
                }//end if
            })//end map()
            anseth.map(val => {
                if (val.month == month && val.day == day){
                    am += 1;
                    setAM(am);
                }//end if
            })//end map()
            radio.map(val => {
                if (val.month == month && val.day == day){
                    rm += 1;
                    setRM(rm);
                }//end if
            })//end map()
            arabic.map(val => {
                if (val.month == month && val.day == day){
                    arm += 1;
                    setAR(arm);
                }//end if
            })//end map()
            quran.map(val => {
                if (val.month == month && val.day == day){
                    qm += 1;
                    setQR(qm);
                }//end if
            })//end map()
            englishM.map(val => {
                if (val.month == month && val.day == day){
                    eMm += 1;
                    setEM(eMm);
                }//end if
            })//end map()
            englishE.map(val => {
                if (val.month == month && val.day == day){
                    eEe += 1;
                    setEE(eEe);
                }//end if
            })//end map()
            lawM.map(val => {
                if (val.month == month && val.day == day){
                    lMm += 1;
                    setLM(lMm);
                }//end if
            })//end map()
            lawE.map(val => {
                if (val.month == month && val.day == day){
                    lEe += 1;
                    setLE(lEe);
                }//end if
            })//end map()

        }//end searchSpecDate()


        data.map((val, index) => {
            let li = [...val.deps];
            if (li[0] == "البصريات صباحي"){
                opticM.push({month: val.month, day: val.day, name: val.name});
            } else if (li[0] == "البصريات مسائي"){
                opticE.push({month: val.month, day: val.day, name: val.name});
            } else if (li[0] == "المختبرات الطبية صباحي"){
                medicalM.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == "المختبرات الطبية مسائي"){
                medicalE.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == "الادارة الصحية صباحي"){
                healthM.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == "الادارة الصحية مسائي"){
                healthE.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == "تقنيات التخدير صباحي"){
                anseth.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == "تقنيات الاشعة صباحي"){
                radio.push({month: val.month, day: val.day, name: val.name})
            } else if(li[0] == "اللغة العربية صباحي"){
                arabic.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == "اللغة الانكليزية صباحي"){
                englishM.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == "اللغة الانكليزية مسائي"){
                englishE.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == "علوم القران صباحي"){
                quran.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == 'القانون صباحي'){
                lawM.push({month: val.month, day: val.day, name: val.name});
            } else if(li[0] == "القانون مسائي"){
                lawE.push({month: val.month, day: val.day, name: val.name});
            }
        })
        return (
            <div style={{width: '70%', position:'relative'}}>

                    <div className="table-wrapper">
                        <h2>الاحصــائيـــات</h2>
                        <div style={{width:'50%'}}>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={false}
                                name="date"
                                value={analDate.filter(obj => dateAnal.includes(obj.label))}
                                onChange={changeDateHandler}
                                options={analDate}
                                required
                            />
                                <div class="search-ana" style={{marginTop:'16px', position:'absolute', fontSize:'14px'}}>
                            {dateAnal == "تاريخ محدد"? <div>
                                                        <input placeholder="شهر / يوم" type="text" onChange={e => setSpecDate(e.target.value)}/>
                                                        <button type="submit" onClick={searchSpecDate}>بحث</button></div>
                                                    : true}
                            </div>
                        </div>
                        
                        <button className="Btn" onClick={() => setIsAnal(false)} style={{marginBottom:'16px'}}>
                            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                            <div className="text">رجوع</div>
                        </button>
                    <table className="fl-table" style={{marginTop:'42px'}}>
                        <thead>
                        <tr>
                            <th>القســـــم</th>
                            <th>عدد المقدميـــن</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>البصريات - صباحي</td>
                                <td>{oM}</td>
                            </tr>
                            <tr>
                                <td>البصريات - مسائي</td>
                                <td>{oE}</td>
                            </tr>
                            <tr>
                                <td>المختبرات الطبية - صباحي</td>
                                <td>{mM}</td>
                            </tr>
                            <tr>
                                <td>المختبرات الطبية - مسائي</td>
                                <td>{mE}</td>
                            </tr>
                            <tr>
                                <td>الادارة الصحية - صباحي</td>
                                <td>{hM}</td>
                            </tr>
                            <tr>
                                <td>الادارة الصحية - مسائي</td>
                                <td>{hE}</td>
                            </tr>
                            <tr>
                                <td>تقنيات التخدير - صباحي</td>
                                <td>{aM}</td>
                            </tr>
                            <tr>
                                <td>تقنيات الأشعة - صباحي</td>
                                <td>{rM}</td>
                            </tr>
                            <tr>
                                <td>اللغة العربية - صباحي</td>
                                <td>{ar}</td>
                            </tr>
                            <tr>
                                <td>اللغة الانكليزية - صباحي</td>
                                <td>{eM}</td>
                            </tr>
                            <tr>
                                <td>اللغة الانكليزية - مسائي</td>
                                <td>{eE}</td>
                            </tr>
                            <tr>
                                <td>علوم القران - صباحي</td>
                                <td>{qr}</td>
                            </tr>
                            <tr>
                                <td>القانون - صباحي</td>
                                <td>{lM}</td>
                            </tr>
                            <tr>
                                <td>القانون - مسائي</td>
                                <td>{lE}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <hr/>
                    <br/>
                    <br/>
                 </div>
            </div>
        )
    }
}
export default ControlView;