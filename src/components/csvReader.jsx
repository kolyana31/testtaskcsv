import React from "react";
import { csv } from "d3";
import CSVReader from "react-csv-reader";

import "./csvReader.css";

import { getType } from "../utils/helpers";

const formInfo = (data) => {
  return new Promise((resolve, reject) => {
    let TMParr = [],
      TMPObj,
      resValue,
      resValue2,
      resultArr = [];
    data.slice(1, data.length - 1).forEach((el, i) => {
      TMParr.push({
        id: i + 1,
        validated: true,
      });
      for (const key in el) {
        TMPObj = getType(key);
        if (TMPObj.type !== 5) {
          resValue = TMPObj.valFuc(
            el[key] !== null ? String(el[key]).trim() : ""
          );
        } else {
          resValue = TMPObj.valFuc(
            el[key] !== null ? String(el[key]).trim() : "",
            el?.Age ? String(el.Age).trim() : ""
          );
        }

        if (resValue) {
          TMParr.push({
            [key]: resValue,
            validated: true,
          });
        } else {
          TMParr.push({
            [key]: el[key] !== null ? String(el[key]).trim() : "",
            validated: false,
          });
        }
      }
      TMParr.push({
        Duplicated: "",
        validated: true,
      });
      resultArr.push(TMParr);
      TMParr = [];
      resValue = [];
    });

    resultArr.forEach((el) => {
      resValue = resultArr.find(
        (el2) =>
          el2[3].Email.toLowerCase() == el[3].Email.toLowerCase() &&
          el2[0].id != el[0].id
      );

      resValue2 = resultArr.find(
        (el2) => el2[2].Phone == el[2].Phone && el2[0].id != el[0].id
      );

      if (resValue?.length > 0) {
        el[3].validated = false;
        el[el.length - 1].Duplicated = resValue[0].id;
      } else if (resValue2?.length > 0) {
        el[2].validated = false;
        el[el.length - 1].Duplicated = resValue2[0].id;
      }
    });

    resolve(resultArr);
  });
};

export const CSVTable = () => {
  const [columns, setColumns] = React.useState(null);
  const [inform, setInform] = React.useState(null);

  const [errText, setErrorText] = React.useState("No file Loaded");

  const handleForce = (data) => {
    let cols = [];
    for (const key in data[0]) {
      cols.push(key);
    }

    if (
      cols.filter(
        (el) =>
          el.toLowerCase() === "full name" ||
          el.toLowerCase() === "phone" ||
          el.toLowerCase() === "email"
      ).length !== 3
    ) {
      setErrorText("File format is not correct");
      setColumns(null);
      setInform(null);
      return;
    }
    setColumns(cols);
    formInfo(data).then((data)=>{
      setInform(data);
    }).catch((el)=>{
      setColumns(null);
      setInform(null);
      setErrorText("Error proccesing data")
    })
   
  };

  return (
    <div
      className="container"
    >
      <div className="input__style">
        <CSVReader
          accept=".csv"
          onFileLoaded={handleForce}
          parserOptions={{
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
          }}
        />
      </div>
      
      {columns?.length > 0 && inform?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th title="id">id</th>
              {columns.map((el, i) => {
                return (
                  <th key={el + i} title={el}>
                    {el}
                  </th>
                );
              })}
              <th title="id">Duplicated with</th>
            </tr>
          </thead>
          <tbody>
            {inform.map((el, i) => {
              return (
                <tr key={el + i}>
                  {el.map((innerEl, i2) => {
                    innerEl = Object.values(innerEl);
                    return (
                      <td
                        key={i2}
                        className={innerEl[1] ? "" : "incorectTd"}
                        title={innerEl[0]}
                      >
                        {innerEl[0]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <span className="warning__span">{errText}</span>
      )}
    </div>
  );
};
