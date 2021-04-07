using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Events;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventApiController : BaseApiController
    {
        private IEventService _service = null;
        private IAuthenticationService<int> _authService = null;
        private ISGEventService _geekService = null;

        public EventApiController(IEventService service,
            ISGEventService geekService,
            ILogger<EventApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
            _geekService = geekService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Event>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<Event> list = _service.GetAll();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Events Not Found");
                }
                else
                {
                    response = new ItemsResponse<Event> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Event>> GetDetailsById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Event model = _service.GetDetailsById(id);

                if(User == null)
                {
                    code = 404;
                    response = new ErrorResponse("Event Resource Not Found");
                }
                else
                {
                    response = new ItemResponse<Event> { Item = model };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Event Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<Event>>> GetPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Event> page = _service.GetDetails(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Events Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Event>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<Paged<Event>> GetSearch(int pageIndex, int pageSize, string searchQuery)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Event> page = _service.GetSearch(pageIndex, pageSize, searchQuery);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Events Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Event>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("category/paginate")]
        public ActionResult<Paged<Event>> GetByCategory(int pageIndex, int pageSize, int eventCategory)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Event> page = _service.GetByCategory(pageIndex, pageSize, eventCategory);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Events Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Event>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("type/paginate")]
        public ActionResult<Paged<Event>> GetByEventType(int pageIndex, int pageSize, int eventType)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Event> page = _service.GetByEventType(pageIndex, pageSize, eventType);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Events Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Event>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(EventAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int createdBy = _service.Add(model, userId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = createdBy };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }

//         Commented out code to protect company security
