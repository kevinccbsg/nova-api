/**
 * A Score info
 * @typedef {object} Score
 * @property {number} involvement.required - involvement - json:{"minimum": 0, "maximum": 10}
 * @property {number} talent.required - talent - json:{"minimum": 0, "maximum": 10}
 */

/**
 * A Nomination request info
 * @typedef {object} NominationRequest
 * @property {string} email.required - Nomination email
 * @property {string} description.required - Nomination description
 * @property {Score} score.required - Nomination score
 */

/**
 * A Nomination request info
 * @typedef {object} Nomination
  * @property {string} id.required - Nomination id
 * @property {string} email.required - Nomination email
 * @property {string} description.required - Nomination end longitude
 * @property {string} referrer.required - Nomination referrer id
 * @property {string} status.required - Nomination status
 * @property {string} dateReferred.required - Nomination dateReferred
 * @property {Score} score.required - Nomination score
 */

/**
 * A Nomination response info
 * @typedef {object} NominationResponse
 * @property {string} id.required - Nomination id
 */

/**
 * A Nomination response info
 * @typedef {object} NominationListResponse
 * @property {Array<Nomination>} data.required - Nominations list
 */
