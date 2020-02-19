import React, {Component} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import './appointment.css';
import chair from './chair.png'
import login from './login.png';
// all the input values put here should be in this stateless component and should be changing the state of the component in the dashboard page state be name and a token number
class AppointmentComponent extends Component {

	constructor(props){
			super(props);
			this.state={
				custName: '',
				custNumber: '',
				barber: '',
				id: 1,
				sessionData: []
			}

	}

	updateName (e) {
		const name = e.target.value;
		// console.log(name);
		this.setState({
				custName: name,
	})
	}

	updateNumber (e) {
		const number = e.target.value;
		// console.log(number);
			this.setState({
				custNumber: number,
	})
	}
	updatebarber (e) {
		const {id} = this.state;
		const barber = e.target.value;
		
		// console.log(number);
			this.setState({
				barber: barber,
				
	})
	}

	setToken = () => {

		const { custName, custNumber, barber, id} = this.state;
		const newid = id+1;
		this.setState({
			id: newid,
		})
		var checkData = sessionStorage.getItem('apptToken');
		// console.log(checkData);

		if(!checkData) {
			var sampleData = [
				{
					custName,
					custNumber,
					barber,
					id,
				}
			];
			

			window.sessionStorage.setItem('apptToken', JSON.stringify(sampleData));
			this.setState({
				sessionData: sampleData
			})
		} else {

			var newData = JSON.parse(checkData);
			var cloneData = cloneDeep(newData);

			cloneData.push(this.state)
			
			window.sessionStorage.setItem('apptToken', JSON.stringify(cloneData));

			this.setState({
				sessionData: cloneData
			})


		}



	}

	inChair(param1) {
		window.sessionStorage.removeItem('apptToken');
		const{sessionData} = this.state;
		console.log(param1);
		const k = param1-1;
		var ourArray = sessionData;
		ourArray.splice(k,1)
		

		this.setState({
			sessionData: ourArray,
		})
		// console.Slog(ourArray);
		window.sessionStorage.setItem('apptToken', JSON.stringify(sessionData));
	}

	removeOnTime (param2) {
		window.sessionStorage.removeItem('apptToken');
		const{sessionData} = this.state;
		console.log(param2);
		
		var ourNewArray = sessionData;
		ourNewArray.splice(param2,1)

		this.setState({
			sessionData: ourNewArray,
		})
		// console.Slog(ourArray);
		window.sessionStorage.setItem('apptToken', JSON.stringify(sessionData));
	}
		
	showPatientList = () => {
		const param =  this.state.sessionData;
		// console.log(param);
		const list = [];
		const list1 = [];
		// const abc = list1.length;	
		// const def = list.length;		
		// console.log(param[0].custName)
		// console.log(param[0].custNumber)
			
		for (var i =0; i< param.length; i++) {
			const n = param[i].id
			const customerToken= i+1;
			// const m = param[i].id+i;
			// console.log(m);
			if(param[i].barber !== "No Prefrence"){
			list.push(
				<tr key={i}>
				    <td className='each-cell' key={param[i].id} >{param[i].custName}</td>
				    <td className='each-cell' >{n}</td>
					<td className='each-cell' >{param[i].barber}</td>
					<td className='status-cell' id={i} onClick={() => this.inChair(customerToken)} ><button> <img src={chair} width='25px' height="25px" alt="in-chair" align="middle"  /> </button></td>
				</tr>
			)
			}else{
				list1.push(
				<tr key={i}>
				    <td className='each-cell' key={param[i].id} >{param[i].custName}</td>
				    <td className='each-cell' >{n}</td>
					<td className='status-cell' onClick={() => this.inChair(customerToken)}><button > <img src={chair} width='25px' height="25px" alt="in-chair" align="middle"  /> </button></td>
				</tr>
				)
			}	
		}
		setTimeout(() => this.removeOnTime(), 900000);
		
		
		return(
			
			<div className="complete-list">
			{list.length ? <div className='list1'>
				Frequent Customers List
				<table className='table' >
				<tr className='list-header'>
					<th className='each-cell'>Name</th>
					<th className='each-cell'>Token</th>
					<th className='each-cell'>Barber</th>
					<th className='each-cell'>Status</th>
				</tr>		
				{list}
				</table>			
			</div> : '' }
			{list1.length ? 
			<div className='list2'>
				New Customers List
				<table className='table' >
				<tr className='list-header'>
					<th className='each-cell'>Name</th>
					<th className='each-cell'>Token</th>
					<th className='each-cell'>Barber</th>
				</tr>		
				{list1}
				</table>
			</div> : ''}
			</div>
		)
		

	}

	


	


	render(){

		const {custName, custNumber, barber, sessionData} = this.state;
		const isEnabled = custName.length > 0 && custNumber.length > 0  && barber.length >0 
		const patientList =  JSON.parse(sessionStorage.getItem('apptToken'));
		console.log(sessionData)
		// console.log(patientList);
		return(
			<div >

				<div className="appointment-box">
				<h1>Book Your Appointment!
				</h1>
				<img src={login} className="login-image" /><br/>
					Name:<input className="input" type='text' onChange={(e) => this.updateName(e)} value={this.state.custName}/><br/>
					Phone Number: <input className="input" type='text' onChange={(e) => this.updateNumber(e)} value={this.state.custNumber} /><br/>
					Choose Your Barber  <select  className="input"  onChange={(e) => this.updatebarber(e)}  >
						<option value="none" selected disabled hidden> 
          					Select an Option 
      					</option>
						<option  value="No Prefrence" >No Prefrence</option>
						<option value="Joe">Joe
						</option>
						<option value="Gary">Gary
						</option>
					</select><br/>
					<button className='appointment-button' onClick={() => this.setToken()} disabled={!isEnabled}>Book it!</button>
					
				</div>

				<div  >
				{patientList && patientList.length ? <div  > {this.showPatientList()} </div> : ''}
					
				</div>
			</div>
		);
	}

}

export default AppointmentComponent;