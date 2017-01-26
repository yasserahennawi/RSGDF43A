import IoC from 'AppIoC';
import { getDocumentId } from 'utils/mongo';

export default class ProductQueryManager {

  filterByCreator(query, creator) {
    query.where('creator', getDocumentId(creator));
    return query;
  }

  filterByCreationDate(query, year, month, day) {
    query.where({
      createdAt: { $gt: new Date(year, month, day) }
    });
    return query;
  }

  filterByAccepted(query) {
    query.where('status', 'accepted');
    return query;
  }

  filterByRejected(query) {
    query.where('status', 'rejected');
    return query;
  }

  filterByAwaiting(query) {
    query.where('status', 'awaiting');
    return query;
  }

  sort(query, sortBy, sortType) {
    query.sort({
      [sortBy]: sortType === 'desc' ? -1 : 1,
    });
    return query;
  }

  pagination(query, before, after, first, last) {
    // @TODO
    return query;
  }

  run(query, {
    // filter options
    year = 2016,
    month = 1,
    day = 1,
    creator,
    accepted,
    rejeted,
    awaiting,
    // Sorting options
    sortBy,
    sortType = 'desc',
    // Fields options
    fields,
    // Pagination options
    before,
    after,
    first,
    last,
  }) {
    // Adding filteration steps
    query = this.filterByCreationDate(query, year, month, day);

    if(creator) {
      query = this.filterByCreator(query, creator);
    }

    if(accepted) {
      query = this.filterByAccepted(query);
    }

    if(rejeted) {
      query = this.filterByRejected(query);
    }

    if(awaiting) {
      query = this.filterByAwaiting(query);
    }

    if(sortBy && sortType) {
      query = this.sort(query, sortBy, sortType)
    }

    if(fields) {
      query = query.select(fields.split(',').join(' '));
    }

    if(before || after || first || last) {
      query = this.pagination(query, before, after, first, last);
    }

    return query;
  }
}

IoC.singleton('productQueryManager', [], ProductQueryManager);
