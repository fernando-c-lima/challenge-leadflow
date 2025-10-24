using FluentValidation;
using System.Net;
using System.Text.Json;

namespace Api.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException ex)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var errors = ex.Errors.Select(e => new { e.PropertyName, e.ErrorMessage });
                var result = JsonSerializer.Serialize(new { Errors = errors });

                await context.Response.WriteAsync(result);
            }
            catch (Exception ex)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var result = JsonSerializer.Serialize(new { Error = ex.Message });
                await context.Response.WriteAsync(result);
            }
        }
    }
}
