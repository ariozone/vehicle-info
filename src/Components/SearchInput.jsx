import React, { useState, useEffect, Fragment } from "react"
import axios from "axios"

const SearchInput = () => {
  //const token = "x7gm7g2srgken5m8ebedjx2p"
  //'https://api.manheim.com/valuations/vin/WBSWL93588PL89088?grade=33&odometer=91372&country=US&color=silver&region=WC'
  const proxyurl = "https://cors-anywhere.herokuapp.com/"

  const [vin, setVin] = useState("")
  const [mileage, setMileage] = useState("")
  const [cr, setCr] = useState("")
  const [region, setRegion] = useState("")
  const [color, setColor] = useState("")
  const [myVehicleData, setMyVehicleData] = useState([])
  const [token, setToken] = useState("")
  const url = `https://api.manheim.com/valuations/vin/${vin}?grade=${cr *
    10}&odometer=${mileage}&country=US&color=${color}&region=${region}`

  const handleSubmit = e => {
    e.preventDefault()
    getData()
  }

  const getData = async () => {
    const res = await axios.get(proxyurl + url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    setMyVehicleData(res.data.items)
  }

  useEffect(() => {
    token && getData()
    // eslint-disable-next-line
  }, [])
  return (
    <Fragment>
      <div className='row mt-5'>
        <div className='col'>
          <h4>Add Info:</h4>
          <form onSubmit={handleSubmit}>
            <div className='form-group mx-5 mt-3 px-3'>
              <label htmlFor='token'>Authorization Token</label>
              <input
                type='text'
                className='form-control  mb-3'
                id='token'
                aria-describedby='tokenHelp'
                placeholder='Enter Authrization Token'
                value={token}
                onChange={e => setToken(e.target.value)}
              />
              {/* <small id='tokenHelp' className='form-text text-muted'>
          token must be 17 characters.
        </small> */}
              <label htmlFor='vin'>VIN</label>
              <input
                type='text'
                className='form-control  mb-3'
                id='vin'
                aria-describedby='vinHelp'
                placeholder='Enter VIN'
                value={vin}
                onChange={e => setVin(e.target.value)}
              />
              {/* <small id='vinHelp' className='form-text text-muted'>
          VIN must be 17 characters.
        </small> */}

              <label htmlFor='mileage'>Mileage</label>
              <input
                type='text'
                className='form-control  mb-3'
                id='mileage'
                aria-describedby='mileageHelp'
                placeholder='Enter Mileage'
                value={mileage}
                onChange={e => setMileage(e.target.value)}
              />
              {/* <small id='mileageHelp' className='form-text text-muted'>
          Mileage is required.
        </small> */}
              <label htmlFor='cr'>CR</label>
              <input
                type='text'
                className='form-control  mb-3'
                id='cr'
                aria-describedby='crHelp'
                placeholder='Enter Condition Report'
                value={cr}
                onChange={e => setCr(e.target.value)}
              />
              {/* <small id='crHelp' className='form-text text-muted'>
          Condition Rating is required.
        </small> */}

              <label htmlFor='regionSelect'>Select Region</label>
              <select
                className='form-control  mb-3'
                id='regionSelect'
                value={region}
                onChange={e => setRegion(e.target.value)}
              >
                <option value='WC'>WC</option>
                <option value='MW'>MW</option>
                <option value='SW'>SW</option>
                <option value='SE'>SE</option>
                <option value='NE'>NE</option>
                <option value='NW'>NW</option>
              </select>
              <label htmlFor='color'>Color</label>
              <input
                type='text'
                className='form-control  mb-3'
                id='color'
                aria-describedby='colorHelp'
                placeholder='Enter Color'
                value={color}
                onChange={e => setColor(e.target.value)}
              />
              {/* <small id='colorHelp' className='form-text text-muted'>
          Color is required.
        </small> */}
            </div>

            <button
              type='submit'
              className='btn btn-secondary
               px-3 mt-5'
              onClick={() =>
                console.log(vin, mileage, cr, region, color, myVehicleData)
              }
            >
              Get Vehicle Info
            </button>
          </form>
          <div></div>
        </div>
        <div className='col'>
          <h4 className='mb-5'>Result:</h4>
          <ul className='bg-dark list-group list-group-flush  mx-5 mt-3 px-3'>
            {/* {Object.keys(myVehicleData[0]).map(key => (
              <li className='bg-dark list-group-item'>{key}</li>
            ))} */}
          </ul>
        </div>
      </div>
    </Fragment>
  )
}
export default SearchInput
