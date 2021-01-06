import React, {Component} from 'react';
import './LandingPage.scss';

class LandingPage extends Component {
    constructor() {
        super();

        this.state = {
            teams: [],
            currentTeam: null,
            newTeamInputValue: '',
            users: [],
            newUserName: '',
            newUserDescription: '',
            searchUser: ''
        }
        this.lastTeamID = 0;
        this.lastUserID = 0;
    }

    render() {
        let {teams, currentTeam, newTeamInputValue, users, newUserName, newUserDescription, searchUser} = this.state;

        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <div style={{padding: '10px 20px', backgroundColor: '#CBD8DE', display: 'flex'}}>
                    <div style={{display: 'flex', alignItems: 'flex-end', marginLeft: 'auto', backgroundColor: 'white', padding: '10px'}}>
                        <div style={{marginRight: '10px'}}>
                            <p className="input-label">Select Type</p>
                            <select className="input-select" style={{backgroundColor: '#CBD8DC'}}>
                                <option selected value="TEAMS">Teams</option>
                            </select>
                        </div>
                        <div style={{marginRight: '10px'}}>
                            <p className="input-label">Type Name</p>
                            <input 
                                value={newTeamInputValue}
                                className="input-text" type="text" 
                                placeholder="Enter here" style={{backgroundColor: '#CBD8DC'}} 
                                onChange={(e) => {this.setState({newTeamInputValue: e.target.value})}} />
                        </div>
                        <button 
                            className="btn" 
                            style={{margin: 0, backgroundColor: '#F5A640', color: 'white'}}
                            onClick={this.onTeamCreate}>CREATE</button>
                    </div>
                </div>
                <div style={{display: 'flex', flexGrow: 1}}>
                    <div style={{flexBasis: '20%', backgroundColor: '#ECEBF0', padding: '40px 10px 0 10px'}}>
                        <p style={{margin: '0 0 10px 0', fontSize: '16px', fontWeight: 500}}>Teams</p>
                        {
                            teams.length ?
                            <ul style={{listStyle: 'none', padding: 0}}>
                                {
                                    teams.map(v => (
                                        <li key={v.ID} className={`team-tab ${currentTeam ? currentTeam.ID === v.ID ? `team-tab-selected` : `` : ``}`} onClick={() => {this.setState({currentTeam: v, searchUser: ''})}}>{v.name}</li>
                                    ))
                                }
                            </ul> :
                            <p style={{fontSize: '12px', color: '#666'}}>No Teams Yet</p>
                        }
                    </div>
                    <div style={{flexBasis: '80%'}}>
                        {
                            currentTeam ?
                            <div style={{padding: '20px 10px 0 10px', overflowX: 'scroll'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                    <h3 style={{marginBottom: '5px'}}>{currentTeam.name}</h3>
                                    <input 
                                        style={{border: 'solid 1px #bbb'}}
                                        value={searchUser} 
                                        className="input-text" 
                                        type="text" 
                                        placeholder="Search user" 
                                        onChange={(e) => {this.setState({searchUser: e.target.value})}} />
                                </div>
                                <hr/>
                                <div style={{height: '600px', width: 'fit-content', display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>

                                    <div key={0} style={{width: '300px', borderRadius: '4px', backgroundColor: '#CBD7DB', padding: '20px 15px 10px 15px', margin: '0 10px 15px 0'}}>
                                        <div style={{marginBottom: '15px'}}>
                                            <p className="input-label">Name</p>
                                            <input 
                                                value={newUserName}
                                                type="text" 
                                                className="input-text" 
                                                placeholder="Enter here" 
                                                style={{width: '95%'}}
                                                onChange={(e) => {this.setState({newUserName: e.target.value})}} />
                                        </div>
                                        <div style={{marginBottom: '15px'}}>
                                            <p className="input-label">Description</p>
                                            <textarea 
                                                value={newUserDescription}
                                                className="input-textarea" 
                                                placeholder="" 
                                                style={{width: '98%'}}
                                                onChange={(e) => {this.setState({newUserDescription: e.target.value})}} />
                                        </div>
                                        <button className="btn" style={{width: '100%', backgroundColor: '#F4A640', color: 'white'}} onClick={this.onUserCreate}>Create User</button>
                                    </div>

                                    {
                                        users.filter(f => (f.teamID === currentTeam.ID && f.name.includes(searchUser))).map(va => (
                                            <div key={va.ID} style={{width: '300px', borderRadius: '4px', backgroundColor: '#CBD7DB', padding: '20px 15px 10px 15px', margin: '0 10px 15px 0'}}>
                                                <div style={{marginBottom: '15px'}}>
                                                    <p className="input-label">Name</p>
                                                    <div style={{width: '98%', height: '36px', backgroundColor: 'white', borderRadius: '4px'}}>{va.name}</div>
                                                </div>
                                                <div style={{marginBottom: '15px'}}>
                                                    <p className="input-label">Description</p>
                                                    <div style={{width: '98%', height: '100px', backgroundColor: 'white', borderRadius: '4px'}}>{va.description}</div>
                                                </div>
                                                <button 
                                                    className="btn" 
                                                    style={{width: '100%', backgroundColor: '#ED3833', color: 'white'}} 
                                                    onClick={() => {this.setState({users: users.filter(f => f.ID !== va.ID)})}}>Delete User</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> :
                            <p style={{textAlign: 'center'}}>No Team Selected</p>
                        }
                    </div>
                </div>
            </div>
        )
    }

    onTeamCreate = () => {
        let {teams, newTeamInputValue} = this.state;
        if (newTeamInputValue.trim() === '') return alert('Team Name cannot be empty!!!');

        let newTeams = [...teams];
        newTeams.push({ID: ++this.lastTeamID, name: newTeamInputValue.trim()});
        this.setState({teams: newTeams, newTeamInputValue: ''})
    }

    onUserCreate = () => {
        let {users, newUserName, newUserDescription, currentTeam} = this.state;
        if (newUserName.trim() === '') return alert('User name cannot be empty!!!');

        let newUsers = [...users];
        newUsers.push({ID: ++this.lastUserID, teamID: currentTeam.ID, name: newUserName, description: newUserDescription});
        this.setState({users: newUsers, newUserName: '', newUserDescription: ''});
    }
}

export default LandingPage;