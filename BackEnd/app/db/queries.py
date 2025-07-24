import psycopg2
from app.modules.APIResponse import APIResponse
from app.db.sessions import get_db_connection
from app.utils.logging import getLogger
from app.utils.DateTime import camparedDate

cl = getLogger()


def get_messages(message_no: int = 0, dateIndex: int = 0):
    con = get_db_connection()
    cur = con.cursor()
    cl.info(
        f"/Get Api Call with Parameters-> message_no: {message_no} && dateIndex: {dateIndex}")
    # Check: calculate the date.
    queryDate = camparedDate(dateIndex)

    cl.info(
        f"After: check  date values-> QueryDate: {queryDate} ")
    # Lets build basic query
    query = """
    SELECT id,sms,created_at FROM messages
     """
    params = []

    # Add where clouse for query
    if queryDate is not None:
        query += " WHERE created_at::date = %s"
        params.append(queryDate)

    query += " ORDER BY created_at DESC"

    # Add limit with fallback
    # limit_value = message_no if message_no > 0 else 3
    if (message_no != 0):
        cl.info(f"limit value after calculate:{message_no}")
        query += " LIMIT %s"
        params.append(message_no)

    query += " ;"
    cl.info(f"Before Excute Query:{query} and parameters:{params}")
    if (len(params) == 0):
        cur.execute(query)
    else:
        cur.execute(query, tuple(params))

    rows = cur.fetchall()

    cur.close()
    con.close()
    return [{"id": r[0], "sms": r[1], "created_at": r[2]} for r in rows]


def post_sms(userSms: str):
    cl.info(f"/Post: Sms send API call with values: {userSms}")
    con = get_db_connection()
    cur = con.cursor()

    if not userSms or len(userSms.split()) > 100:
        return APIResponse(
            status="error",
            message="SMS must not be empty or exceed 100 words.",
            data=[]
        )

    query = """
        INSERT INTO messages(sms)
        VALUES (%s);
    """
    cl.info(f"Query before execute: {query}")

    try:
        cur.execute(query, (userSms,))
        con.commit()
        cur.close()

        return APIResponse(
            status="success",
            message="SMS inserted!",
            data={"sms": "Sms inserted!"},
        )
    except psycopg2.Error as e:
        cl.error(f"Database Error: {e}")
        return APIResponse(
            status="error",
            message="Database insert failed!",
            data=[]
        )
