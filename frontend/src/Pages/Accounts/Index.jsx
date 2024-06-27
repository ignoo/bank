// import '../../Style/App.scss';
import '../../Style/table.scss';
import '../../Style/Modal.scss';
import NavBarBtns from '../NavBarBtns';
import CreateNewMod from '../Modals/CreateNewMod';
import { useState } from 'react';
import { AccountsProvider } from '../../Contexts/Accounts';
import Table from './Table';
import EditMod from '../Modals/EditMod';
import DeleteMod from '../Modals/DeleteMod';
import { StatsProvider } from '../../Contexts/Stats';
import AccountStats from './AccountStats';
import { MessagesProvider } from '../../Contexts/Messages';
import TaxesMod from '../Modals/TaxesMod';
import AddMoreMod from '../Modals/AddMoreMod';
import FilterSort from './FilterSort';


export default function Index() {

  const [showCreateModal, setShowCreateModal] = useState('hide');
  const [showEditModal, setShowEditModal] = useState('hide');
  const [showDeleteModal, setShowDeleteModal] = useState('hide');
  const [showTaxModal, setShowTaxModal] = useState('hide');


  return (
    <div className='body'>
      <header className="header">
        <div className='header-container'>
          <a href="#home"><h1>.B.ANKA.S.</h1></a>
        </div>
        <NavBarBtns />
      </header>
      <StatsProvider>
        <AccountStats />
      </StatsProvider>
      <main>
        <h2>Sąskaitų suvestinė</h2>
        <AccountsProvider>
          <FilterSort />
          <MessagesProvider>
            <Table setShowEditModal={setShowEditModal} setShowDeleteModal={setShowDeleteModal} />
          </MessagesProvider>
          <CreateNewMod showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
          <EditMod showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
          <DeleteMod showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
          <TaxesMod showTaxModal={showTaxModal} setShowTaxModal={setShowTaxModal} />
          <AddMoreMod />
        </AccountsProvider>
        <div className='lower-bar'>
          <button className='btn mokesciai' onClick={_ =>setShowTaxModal('show')}>Mokesčiai</button>
          <button className='btn nauja' onClick={_ => setShowCreateModal('show')}>Pridėti naują sąskaitą</button>
        </div>
      </main>
      
    </div>
  );
}