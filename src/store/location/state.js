export default {
    fetchingData : false,
    errors : null,
    data : {},
    create: {
        fetchingData : false,
        errors : null,
        data : {
            // name: 'name',
            // is_active: 'is_active',
        },
    },
    list: {
        fetchingData : false,
        errors : null,
        data : {
            // example response backend
            page: 0,
            current_page: 0,
            per_page: 10,
            last_page: 1,
            next_page: 1,
            prev_page: null,
            list: [
                // Example 
                // {
                //     id: 1,
                //     name: 'name',
                //     is_active: 'is_active',
                //     created_at: 'created_at',
                //     updated_at: 'updated_at',
                // }
            ],
        },
        params: {
            // Example of what the backend expects
            page: 1,
            per_page: 10,
            sort_by: 'created_at',
            sort: 'desc',
            filter: '',
            filter_by: '',
        }

    },
}

