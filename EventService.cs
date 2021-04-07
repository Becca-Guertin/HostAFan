using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Events;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class EventService: IEventService
    {
        IDataProvider _data = null;
        ILocationMapper _mapLocation = null;
        IUserDetailMapper _userDetailMapper = null;

        public EventService(IDataProvider data, ILocationMapper locationMapper, IUserDetailMapper userDetailMapper)
        {
            _data = data;
            _mapLocation = locationMapper;
            _userDetailMapper = userDetailMapper;
        }

        public List<Event> GetAll()
        {
            List<Event> list = null;
            string procName = "[dbo].[Events_SelectAllV2]";



            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Event model = MapEvent(reader);

                if (list == null)
                {
                    list = new List<Event>();
                }
                list.Add(model);
            });
            return list;
        }

        public Event GetDetailsById(int id)
        {
            string procName = "[dbo].[Events_SelectDetails_ById]";

            Event model = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                model = MapEvent(reader);
            }
            );
            return model;
        }

        public Paged<Event> GetDetails(int pageIndex, int pageSize)
        {
            Paged<Event> pagedResult = null;

            List<Event> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Events_SelectDetails]",
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Event model = MapEvent(reader);
                    int index = 0;
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (result == null)
                    {
                        result = new List<Event>();
                    }
                    result.Add(model);
                }
                );
                if (result != null)
                {
                pagedResult = new Paged<Event>(result, pageIndex, pageSize, totalCount);
                }
            return pagedResult;
        }

        public Paged<Event> GetSearch(int pageIndex, int pageSize, string searchQuery)
        {
            Paged<Event> pagedResult = null;

            List<Event> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Events_Search]",
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@SearchQuery", searchQuery);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Event model = MapEvent(reader);

                    int index = 0;

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (result == null)
                    {
                        result = new List<Event>();
                    }
                    result.Add(model);
                }
                );
            if (result != null)
            {
                pagedResult = new Paged<Event>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public Paged<Event> GetByCategory(int pageIndex, int pageSize, int eventCategory)
        {
            Paged<Event> pagedResult = null;

            List<Event> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Events_Select_ByCategory]",
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@EventCategory", eventCategory);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Event model = MapEvent(reader);

                    int index = 0;

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (result == null)
                    {
                        result = new List<Event>();
                    }
                    result.Add(model);
                }
                );
            if (result != null)
            {
                pagedResult = new Paged<Event>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public Paged<Event> GetByEventType(int pageIndex, int pageSize, int eventType)
        {
            Paged<Event> pagedResult = null;

            List<Event> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Events_Select_ByEventType]",
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@EventType", eventType);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Event model = MapEvent(reader);

                    int index = 0;

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (result == null)
                    {
                        result = new List<Event>();
                    }
                    result.Add(model);
                }
                );
            if (result != null)
            {
                pagedResult = new Paged<Event>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public int Add(EventAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Events_InsertV2]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddParams(model, col, userId);
                col.AddWithValue("@CreatedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCol)
            {
               
                object oId = returnCol["@Id"].Value;
                Int32.TryParse(returnCol["@Id"].Value.ToString(), out id);
            }
            );
            return id;
        }

        private static void AddParams(EventAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@EventTypeId", model.EventType);
            col.AddWithValue("@EventCategoryId", model.EventCategory);
            col.AddWithValue("@EventName", model.EventName);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@ShortDescription", model.ShortDescription);
            col.AddWithValue("@LocationTypeId", model.LocationTypeId);
            col.AddWithValue("@LineOne", model.LineOne);
            col.AddWithValue("@LineTwo", model.LineTwo);
            col.AddWithValue("@City", model.City);
            col.AddWithValue("@Zip", model.Zip);
            col.AddWithValue("@StateId", model.StateId);
            col.AddWithValue("@Latitude", model.Latitude);
            col.AddWithValue("@Longitude", model.Longitude);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Url", model.Url);
            col.AddWithValue("@UserId", userId);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@EventStatusId", model.EventStatusId);
            col.AddWithValue("@EventImageUrl", model.EventImageUrl);
            col.AddWithValue("@ExternalSiteUrl", model.ExternalSiteUrl);
            col.AddWithValue("@ExternalId", model.ExternalId);
            col.AddWithValue("@IsFree", model.IsFree);
            col.AddWithValue("@DateStart", model.DateStart);
            col.AddWithValue("@DateEnd", model.DateEnd);
            
        }

        private Event MapEvent(IDataReader reader)
        {
            Event model = new Event();

            int index = 0;

            model.Id = reader.GetSafeInt32(index++);
            model.EventType = new LookUp();
            model.EventType.Id = reader.GetSafeInt32(index++);
            model.EventType.Name = reader.GetSafeString(index++);
            model.EventCategory = new LookUp();
            model.EventCategory.Id = reader.GetSafeInt32(index++);
            model.EventCategory.Name = reader.GetSafeString(index++);
            model.Name = reader.GetSafeString(index++);
            model.Summary = reader.GetSafeString(index++);
            model.ShortDescription = reader.GetSafeString(index++);
            model.Venue = new Venue();
            model.Venue.Id = reader.GetSafeInt32(index++);
            model.Venue.Name = reader.GetSafeString(index++);
            model.Venue.Description = reader.GetSafeString(index++);
            model.Venue.Url = reader.GetSafeString(index++);
            model.Venue.IsDeleted = reader.GetSafeBool(index++);
            model.Venue.ImageUrl = reader.GetSafeString(index++);
            model.Venue.DateCreated = reader.GetSafeDateTime(index++);
            model.Venue.DateModified = reader.GetSafeDateTime(index++);
            model.Venue.Location = _mapLocation.MapLocation(reader, ref index);
            model.EventStatus = new LookUp();
            model.EventStatus.Id = reader.GetSafeInt32(index++);
            model.EventStatus.Name = reader.GetSafeString(index++);
            model.ImageUrl = reader.GetSafeString(index++);
            model.ExternalId = reader.GetSafeInt32(index++);
            model.ExternalSiteUrl = reader.GetSafeString(index++);
            model.IsFree = reader.GetSafeBool(index++);
            model.DateStart = reader.GetSafeDateTime(index++);
            model.DateEnd = reader.GetSafeDateTime(index++);
            model.CreatedBy = _userDetailMapper.MapUserDetail(reader, ref index);
            

            return model;

        }


    }
}
