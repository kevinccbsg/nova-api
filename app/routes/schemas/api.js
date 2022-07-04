/**
 * A Score info
 * @typedef {object} Score
 * @property {number} involvement.required - Nomination start latitude - json:{"minimum": 0, "maximum": 10}
 * @property {number} talent.required - Nomination end longitude - json:{"minimum": 0, "maximum": 10}
 */

/**
 * A Nomination request info
 * @typedef {object} NominationRequest
 * @property {string} email.required - Nomination start latitude
 * @property {string} description.required - Nomination end longitude
 * @property {Score} score.required - Nomination end longitude
 */

/**
 * A Nomination response info
 * @typedef {object} NominationResponse
 * @property {string} id.required - Nomination id
 */
