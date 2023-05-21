import { Component } from 'react';
import { Wrap } from 'components/App.styled.js';

import { PER_PAGE } from 'services/constants';
import * as API from '../services/api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    // resesarch word
    searchValue: '',

    // array of gallery objects
    gallery: [],

    //flag shower of spiner
    isLoading: false,

    //flag shower button of 'read-more'
    isMore: false,

    // {img:refer to large img,alt:text of attribute alt}
    modalImg: null,
  };

  componentDidUpdate(_, { gallery }) {
    if (this.state.gallery.length === 0) window.scrollTo({ top: 0 });
    if (gallery.length !== this.state.gallery.length)
      window.scrollTo({
        top: document.querySelector('body').scrollHeight,
        behavior: 'smooth',
      });
  }

  // helper function for working with request api
  requestToApi = async (searchValue, currentGallery) => {
    this.setState({ isLoading: true });
    try {
      const { reqGallery, isMore } = await API.readData(
        searchValue,
        Math.floor(currentGallery.length / PER_PAGE) + 1
      );

      this.setState({
        gallery: [...currentGallery, ...reqGallery],
        isMore,
        searchValue,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        searchValue: '',
        gallery: [],
        isMore: false,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // submit new word
  handleSubmit = searchValue => {
    this.setState({
      searchValue,
      gallery: [],
      isLoading: true,
    });

    this.requestToApi(searchValue, []);
  };

 
  handleMore = () => {
    this.requestToApi(this.state.searchValue, this.state.gallery);
  };

  
  onClickToGallery = modalImg => {
    this.setState({ modalImg });
  };

  
  closeModal = () => this.setState({ modalImg: null });

  render() {
    const { gallery, isMore, isLoading, modalImg } = this.state;
    return (
      <Wrap>
       
        {modalImg && (
          <Modal closeWindow={this.closeModal}>
            <img src={modalImg?.img} alt={modalImg?.alt} />
          </Modal>
        )}

        <Searchbar onSubmit={this.handleSubmit} isDisabled={isLoading} />
        
        <ImageGallery
          gallery={gallery}
          onClickToGallery={this.onClickToGallery}
        />
      
        <Loader visible={isLoading} />
        
        {isMore && <Button isDisabled={isLoading} onClick={this.handleMore} />}
      </Wrap>
    );
  }
}
export default App;
