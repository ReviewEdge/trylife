using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Text.Json;

[ApiController]
[Route("[controller]")]
public class ClientController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ClientController(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    [HttpGet]
    public async Task<IActionResult> GetClientById(int id)
    {
        try
        {
            var client = await _context.Client.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the getClientById");
        }
    }

    [HttpGet("/clients")]
    public async Task<IActionResult> GetAllClients()
    {
        try
        {
            var clients = await _context.Client.ToListAsync(); // Fetch all clients from the Clients table

            if (clients == null || !clients.Any())
            {
                return NotFound(); // Return 404 if no clients are found
            }

            return Ok(clients); // Return the list of clients
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred: " + ex.ToString());
        }
    }


    [HttpGet]
    public IActionResult GetClientByName([FromQuery] string name)
    {
        var client = _context.Client.FirstOrDefault(c => c.Name == name);

        if (client == null)
        {
            return NotFound(); // 404
        }

        return Ok(client);
    }

    [HttpPost]
    public async Task<IActionResult> CreateClient([FromBody] Client client)
    {
        if (client == null)
        {
            return BadRequest(); // 400
        }

        _context.Client.Add(client);
        await _context.SaveChangesAsync(); // save changes

        return CreatedAtAction(nameof(GetClientById), new { id = client.Id }, client); // 201
    }
}
