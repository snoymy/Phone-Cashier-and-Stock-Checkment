import CompanyController from '../controller/company.controller'; 
import express  from 'express';

const CompanyRouter = express.Router();
CompanyRouter.get(
    "/",
  
);
CompanyRouter.post(
    "/addCompany",
    CompanyController.addList
);

CompanyRouter.get(
    "/getCompanies",
    CompanyController.getList
);

CompanyRouter.post(
    "/getOneCompany",
    CompanyController.getOne
);

CompanyRouter.put(
    "/updateCompany/:id",
    CompanyController.editList
);

CompanyRouter.delete(
    "/deleteCompany/:id",
    CompanyController.deleteList
);


export default CompanyRouter;