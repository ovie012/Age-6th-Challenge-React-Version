import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [error, setError] = useState(false);

  const [dayErrorText, setDayErrorText] = useState('');
  const [monthErrorText, setMonthErrorText] = useState('');
  const [yearErrorText, setYearErrorText] = useState('');

  const [calculatedDay, setCalculatedDay] = useState('- -');
  const [calculatedMonth, setCalculatedMonth] = useState('- -');
  const [calculatedYear, setCalculatedYear] = useState('- -');

  // const dayInput = useRef();
  // const monthInput = useRef();
  // const yearInput = useRef();

  //i made use of object destructuring to make the below look better than the above

  const inputRef = {
    dayInput: useRef(),
    monthInput: useRef(),
    yearInput: useRef(),
  };

  const calculateAge = () => {
    const currentDate = new Date();
    const dayDate = Number(String(currentDate.getDate()).padStart(2, '0'));
    const monthDate = Number(String(currentDate.getMonth() + 1).padStart(2, '0'));
    const yearDate = currentDate.getFullYear();
    const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
    };

    const day = Number(inputRef.dayInput.current.value);
    const month = Number(inputRef.monthInput.current.value);
    const year = Number(inputRef.yearInput.current.value);
    const leapYear = isLeapYear(year);

    if (
        (day > 31 || day < 0) || 
        ((month === 4 || month === 6 || month === 9 || month === 11) && (day > 30)) || 
        ((month === 2) && (day > 29) && leapYear) || 
        ((month === 2) && (day > 28) && !leapYear)
    ) {
      setError(true);
      setDayErrorText('Must be a valid day');
    } else if (day === '' || day === 0) {
      setError(true);
      setDayErrorText('This field is required');
    } else {
      setDayErrorText('');
    };
    
    if (month < 0 || month > 12) {
      setError(true)
      setMonthErrorText('Must be a valid month');
    } else if (month === '' || month === 0) {
      setError(true);
      setMonthErrorText('This field is required');
    } else {
      setMonthErrorText('')
    };

    if (year > yearDate  || year < 0) {
      setError(true);
      setYearErrorText('Must be in the past')
    } else if (year === '' || year === 0) {
      setError(true);
      setYearErrorText('This field is required');
    } else {
      setYearErrorText('')
    };

    if (
      (day > 31 || day < 0) ||
      (day === '' || day === 0) ||
      ((month === 4 || month === 6 || month === 9 || month === 11) && (day > 30)) ||
      ((month === 2) && (day > 29) && leapYear) ||
      ((month === 2) && (day > 28) && !leapYear) ||
      (month < 0 || month > 12) ||
      (month === '' || month === 0) ||
      (year > yearDate  || year < 0) ||
      (year === '' || year === 0)
    ) {
      return;
    }
    
    setError(false);
      setCalculatedYear(yearDate - year);
      setCalculatedMonth(monthDate - month);
      setCalculatedDay(dayDate - day);
      if ((monthDate - month < 0) || ((monthDate === month) && (dayDate - day < 0))) {
        setCalculatedYear((yearDate - year) - 1);
      }

      if (monthDate - month < 0) {
        setCalculatedMonth((monthDate + 12) - month);
        // setCalculatedYear((yearDate - year) - 1); // i commented this out because its not necessary
      }

      if (dayDate - day < 0) {
        const firstDayOfTheCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfThePreviousMonth = new Date(firstDayOfTheCurrentMonth);
        lastDayOfThePreviousMonth.setDate(firstDayOfTheCurrentMonth.getDate() - 1);
        const daysInPreviousMonth = lastDayOfThePreviousMonth.getDate();
        
        
        setCalculatedDay((daysInPreviousMonth + dayDate) - day);
        if (monthDate - month < 0) {
          setCalculatedMonth(((monthDate + 12) - month) - 1);
        } else {
          setCalculatedMonth((monthDate - month) - 1);
        }
      }

  };


  return (
    <>
      <main>
        <div className="container">
          <div className="box">
              <div className="date">
                  <form method="post">
                      <div className={`day-dates dates ${error ? 'active' : ''}`}>
                          <h6 className="day">day</h6>
                          <input 
                            ref={inputRef.dayInput}
                            className="input input-day" 
                            type="number" 
                            name="day" 
                            id="day" 
                            placeholder="DD" 
                          />
                          {error && <p className="empty-day">{dayErrorText}</p>}
                      </div>
                      <div className={`month-dates dates ${error ? 'active' : ''}`}>
                          <h6 className="month">month</h6>
                          <input 
                            ref={inputRef.monthInput} 
                            className="input input-month" 
                            type="number" 
                            name="month" 
                            id="month" 
                            placeholder="MM" 
                          />
                          {error && <p className="empty-month">{monthErrorText}</p>}
                      </div>
                      <div className={`year-dates dates ${error ? 'active' : ''}`}>
                          <h6 className="year">year</h6>
                          <input 
                            ref={inputRef.yearInput}
                            className="input input-year" 
                            type="number" 
                            name="year" 
                            id="year" 
                            placeholder="YYYY" 
                          />
                          {error && <p className="empty-year">{yearErrorText}</p>}
                      </div>
                  </form>
              </div>
              <div className="click">
                  <span></span>
                  <button 
                    onClick={calculateAge} 
                    className="img"
                  >
                      <img src="/icon-arrow.svg" alt="click me" />
                  </button>
              </div>
              <div className="date-displayed">
                  <h1><span className="display-year calc">{calculatedYear}</span>&nbsp;years</h1>
                  <h1><span className="display-month calc">{calculatedMonth}</span>&nbsp;months</h1>
                  <h1><span className="display-day calc">{calculatedDay}</span>&nbsp;days</h1>
              </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App

//LEGEND.DEV coded this





















// more professional and concise way below

// import { useState, useRef } from 'react';
// import './App.css';

// function App() {
//   const [errors, setErrors] = useState({ day: '', month: '', year: '' });
//   const [calculatedDate, setCalculatedDate] = useState({ day: '- -', month: '- -', year: '- -' });

//   const inputRefs = {
//     day: useRef(),
//     month: useRef(),
//     year: useRef(),
//   };

//   const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

//   const validateInputs = (day, month, year, currentDate) => {
//     const yearDate = currentDate.getFullYear();
//     let newErrors = { day: '', month: '', year: '' };

//     if (!day || day <= 0 || day > 31 || ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) || 
//         (month === 2 && ((isLeapYear(year) && day > 29) || (!isLeapYear(year) && day > 28)))) {
//       newErrors.day = 'Must be a valid day';
//     }

//     if (!month || month <= 0 || month > 12) {
//       newErrors.month = 'Must be a valid month';
//     }

//     if (!year || year <= 0 || year > yearDate) {
//       newErrors.year = 'Must be in the past';
//     }

//     setErrors(newErrors);
//     return !newErrors.day && !newErrors.month && !newErrors.year;
//   };

//   const calculateAge = () => {
//     const currentDate = new Date();
//     const day = Number(inputRefs.day.current.value);
//     const month = Number(inputRefs.month.current.value);
//     const year = Number(inputRefs.year.current.value);

//     if (!validateInputs(day, month, year, currentDate)) return;

//     let ageYear = currentDate.getFullYear() - year;
//     let ageMonth = currentDate.getMonth() + 1 - month;
//     let ageDay = currentDate.getDate() - day;

//     if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
//       ageYear -= 1;
//       ageMonth += 12;
//     }

//     if (ageDay < 0) {
//       const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
//       ageDay += lastDayOfPreviousMonth;
//       ageMonth -= 1;
//     }

//     setCalculatedDate({ day: ageDay, month: ageMonth, year: ageYear });
//   };

//   return (
//     <main>
//       <div className="container">
//         <div className="box">
//           <div className="date">
//             <form>
//               {['day', 'month', 'year'].map((field) => (
//                 <div key={field} className={`dates ${errors[field] ? 'active' : ''}`}>
//                   <h6 className={field}>{field}</h6>
//                   <input
//                     ref={inputRefs[field]}
//                     className={`input input-${field}`}
//                     type="number"
//                     placeholder={field.toUpperCase()}
//                   />
//                   {errors[field] && <p className={`empty-${field}`}>{errors[field]}</p>}
//                 </div>
//               ))}
//             </form>
//           </div>
//           <div className="click">
//             <button onClick={calculateAge} className="img">
//               <img src="/icon-arrow.svg" alt="Calculate age" />
//             </button>
//           </div>
//           <div className="date-displayed">
//             {['year', 'month', 'day'].map((field) => (
//               <h1 key={field}>
//                 <span className={`display-${field} calc`}>{calculatedDate[field]}</span>&nbsp;{field}s
//               </h1>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default App;
