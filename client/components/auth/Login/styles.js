import colors from 'themes/colors';

export default {
  logo: {
    position: 'absolute',
    right: 28,
    top: 35,
    fontSize: 8,
    display: 'flex',
    alignSelf: 'flex-end',
  },
  copyright: {
    fontSize: 12,
    bottom: 125,
    paddingBottom: 30,
  },
  card: {
    minWidth: 380,
    padding: '0 10px',
    borderRadius: 4,
    boxShadow: 'none',
    border: '1px solid #e0e0e0',
  },
  title: {
    textAlign: 'center',
    padding: '30px 0px 15px 0px',
    border: 0,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  titleText: {
    padding: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  container: {
    display: '-webkit-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    flexDirection: 'column',
    background: colors.gradient,
    position: 'relative',
  },
  containerC: {
    display: '-webkit-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    flexDirection: 'column',
    position: 'relative',
  },
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 15px',
    marginTop: 10,
  },
  cardActions: {
    padding: '0px 8px 20px',
  },
  textField: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    boxShadow: 'none',
    background: '#50e3c2'
  },
  button: {
    padding: 5,
    height: 'initial',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 400,
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    color: colors.text,
    //marginBottom: 8,
    marginLeft: -13,
  },
  checkbox: {
    marginTop: 10,
  },
  spanText: {
    marginTop: 8,
    textTransform: 'uppercase',
  },
  link: {
    fontSize: 12,
    textDecoration: 'none',
    color: colors.textBlue,
    alignSelf: 'flex-end',
    height: 5,
  },
};
