import Vuex from 'vuex';
import announcementsData from './announcements.json';
export default new Vuex.Store({
    state: {
        //Fixme: Extract to initial API call when it is built out
        announcements: announcementsData,
        displayedAnnouncements: [],
        currentPage: 1,
        pageSize: 4,
    },
    mutations: {
        setAnnouncements(state, announcements) {
            state.displayedAnnouncements = announcements
        },
        setCurrentPage(state, page) {
            state.currentPage = page;
            //Fixme add ORM query filtering based on page and page size when API is built out
            const start = (page - 1) * state.pageSize;
            const end = start + state.pageSize;
            state.displayedAnnouncements = state.announcements.slice(start, end);
        },
    },
    actions: {
        fetchAnnouncements({ commit, state }) {
            //Fixme add ORM query filtering based on page and page size when API is built out
            const start = (state.currentPage - 1) * state.pageSize;
            const end = start + state.pageSize;
            const filteredAnnouncements = state.announcements.slice(start, end);
            commit("setAnnouncements", filteredAnnouncements);
        },
        setPage({ commit, dispatch }, page) {
            commit('setCurrentPage', page);
            //Fetch the announcements based on current page
            dispatch('fetchAnnouncements');
        },
    },
    getters: {
        getTotalPages: state => Math.ceil(state.announcements.length / state.pageSize),
    },
});
