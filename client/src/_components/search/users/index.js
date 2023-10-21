import React from 'react';

import { Link } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import SearchTemplate from '../template'

const headers = {
    Authorization: 'Bearer d79b947574967d1d20d78e0f0ebd19610042471fbd7ee7a2786cd949d4d6fe9d',
    'Content-Type': 'application/json',
}
function UserSearchBar(props) {

    const [ modalText, setModalText ] = React.useState('');
    const [ modalOpen, setModalOpen ] = React.useState(false);
    const [ search_content, changeSearchTerms ] = React.useState('');
    const [ user_results, changeUserResults ] = React.useState([]);

    function closeModal() { setModalOpen(false); }


    function Search() {

        let data = {
            "queries" : [
                {
                    "indexUid":"users",
                    "q":search_content, 
                    "limit":5
                },
            ]
        }

        fetch('/multi-search', {
            method:"Post",
            headers: headers,
            body:JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            changeUserResults(data.results)
           
        }).catch(error => {
            setModalText('Error while searching')
            setModalOpen(true);
            console.error(error)
        });
    }


    return (
        <SearchTemplate 
            Search={Search}
            search_content={search_content}
            changeSearchTerms={changeSearchTerms}
            modalText={modalText}
            modalOpen={modalOpen}
            closeModal={closeModal}
            >
            { 
                user_results.length 
                ?
                <>
                    <ListItem>
                        <ListItemText secondary="Users"/>
                    </ListItem>
                    { 
                        user_results[0].hits.map((result, index) => {
                            console.log(user_results)
                            return (
                                <>
                                    <Link to={"/profile/view/" + result.id}>
                                        <ListItem button>
                                            <ListItemText primary={ result.first_name + ' ' + result.last_name } />
                                        </ListItem>
                                    </Link>
                                    <Divider variant="middle" />
                                </>
                            );
                        })
                    }
                </>
                : 
                undefined
            }
        </SearchTemplate>

    );
}

export default UserSearchBar;
