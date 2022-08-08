using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserController(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        [HttpGet(Name = "GetUserName")]
        public string Get()
        {
            string userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;
            return userId;
        }
    }
}